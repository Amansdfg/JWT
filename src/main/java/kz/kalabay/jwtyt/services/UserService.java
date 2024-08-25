package kz.kalabay.jwtyt.services;


import kz.kalabay.jwtyt.mapper.UserMapper;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.ChangePasswordDto;
import kz.kalabay.jwtyt.model.dto.RegistrationUserDto;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserMapper mapper;
    private final UserRepositories userRepositories;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final PostService postService;
    public Optional<User> findByUsername(String username) {
        return userRepositories.findByUsername(username);
    }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                String.format("User %s not found", username)
        ));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList())
                );
    }
    public User createNewUser(RegistrationUserDto userDto) {
        User user=new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setRoles(List.of(roleService.getUserRole()));
        return userRepositories.save(user);
    }
    public User getByUsername(String username){
        return userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
    }
    public UserDto getUserByUsername(String username){
        return mapper.mapToDTO(userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("Not found")));
    }
    public User getUserById(Long id){
        return userRepositories.findById(id).orElseThrow(()->new RuntimeException("Not found"));
    }
    public UserDto getUserByIdDto(Long id){
        return mapper.mapToDTO(userRepositories.findAllById(id).orElseThrow(()->new RuntimeException("Not found")));
    }
//    public ResponseEntity<String> post(String username, Post post) {
//        User user = userRepositories.findByUsername(username).orElseThrow(() -> new RuntimeException("Not found"));
//        postService.savePost(post);
////        Post savedPost = postService.getPostById(post.getId());
//        List<Post> posts = user.getPosts();
//        posts.add(post);
//        user.setPosts(posts);
//        userRepositories.save(user);
//
//        return new ResponseEntity<>("Post created successfully", HttpStatus.CREATED);
//    }
    public ResponseEntity<String> post(String username, Post post, MultipartFile file) {
        User user = userRepositories.findByUsername(username).orElseThrow(() -> new RuntimeException("Not found"));

        try {
            postService.savePostWithImage(post, file);

            List<Post> posts = user.getPosts();
            posts.add(post);
            user.setPosts(posts);
            userRepositories.save(user);

            return new ResponseEntity<>("Post created successfully", HttpStatus.CREATED);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public List<UserDto> getAllUsers() {
        return mapper.mapToDTOList(userRepositories.findAll());
    }
    public List<UserDto> getRecommendationUsers(String username){
        return mapper.mapToDTOList(userRepositories.findAllByNotUsernameAndNotFriends(username));
    }
    public User saveUser(User user) {
        return userRepositories.save(user);
    }
    public List<UserDto> searchUsers(String username) {
        return  mapper.mapToDTOList(userRepositories.findByUsernameContainingIgnoreCase(username));
    }
    public String changePassword(ChangePasswordDto changePasswordDto) {
        User user=userRepositories.findByUsername(changePasswordDto.getUsername()).orElseThrow(()->new RuntimeException("Not found"));
        if(!passwordEncoder.matches(changePasswordDto.getOldPassword(), user.getPassword())){
            throw new RuntimeException("Password does not match");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepositories.save(user);
        return "Successfully changed password";
    }
}
