package kz.kalabay.jwtyt.services;


import kz.kalabay.jwtyt.mapper.UserMapper;
import kz.kalabay.jwtyt.mapper.UserSimpleDto;
import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.ChangePasswordDto;
import kz.kalabay.jwtyt.model.dto.RegistrationUserDto;
import kz.kalabay.jwtyt.model.dto.SimpleUser;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.repostory.RepositoryIndChat;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    private final RepositoryIndChat repositoryIndChat;
    private final UserSimpleDto userSimpleDto;
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
        user.setPhoto("images/No-photo.gif");
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
            return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public List<UserDto> getAllUsers() {
        return mapper.mapToDTOList(userRepositories.findAll());
    }
    public List<UserDto> getRecommendationUsers(String username){
        Pageable pageable = PageRequest.of(0, 5);
        Page<User> usersPage = userRepositories.findAllByNotUsernameAndNotFriends(username, pageable);
        List<User> users = usersPage.getContent();
        return mapper.mapToDTOList(users);
    }
    public void saveUser(User user) {
        userRepositories.save(user);
    }
    public List<UserDto> searchUsers(String username) {
        return  mapper.mapToDTOList(userRepositories.findByUsernameContainingIgnoreCase(username));
    }
    public ResponseEntity<String> changePassword(ChangePasswordDto changePasswordDto) {
        User user=userRepositories.findByUsername(changePasswordDto.getUsername()).orElseThrow(()->new RuntimeException("Not found"));
        if(!passwordEncoder.matches(changePasswordDto.getOldPassword(), user.getPassword())){
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password does not match");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userRepositories.save(user);
        return ResponseEntity.ok("Successfully changed password");
    }
    public SimpleUser fetchUser(Long id,String username) {
        IndividualChat individualChat=repositoryIndChat.findById(id).orElseThrow(()->new RuntimeException("Not found"));
        return userSimpleDto.mapToDTO(individualChat.getUser1().getUsername().equals(username)?individualChat.getUser2():individualChat.getUser1());
    }
    public String changePhoto(MultipartFile file, String username) throws IOException {
        User user=userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("Not found"));
        Path path = Paths.get("images/" + file.getOriginalFilename());
        Files.createDirectories(path.getParent());
        Files.write(path, file.getBytes());
        user.setPhoto("images/"+file.getOriginalFilename());

        userRepositories.save(user);
        return "Successfully changed photo";
    }
}
