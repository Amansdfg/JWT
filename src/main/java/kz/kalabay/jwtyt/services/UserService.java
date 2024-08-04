package kz.kalabay.jwtyt.services;


import kz.kalabay.jwtyt.mapper.UserMapper;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
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
        user.setEmail(userDto.getEmail());
        user.setRoles(List.of(roleService.getUserRole()));
        return userRepositories.save(user);
    }
    public User getByUsername(String username){
        return userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
    }
    public List<UserDto> getAllFriend(String username){
        User user=userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
        return mapper.mapToDTOList(user.getFriends());
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
    public ResponseEntity<String> post(String username, Post post) {
        User user = userRepositories.findByUsername(username).orElseThrow(() -> new RuntimeException("Not found"));
        postService.savePost(post);
//        Post savedPost = postService.getPostById(post.getId());
        List<Post> posts = user.getPosts();
        posts.add(post);
        user.setPosts(posts);
        userRepositories.save(user);

        return new ResponseEntity<>("Post created successfully", HttpStatus.CREATED);
    }
}
