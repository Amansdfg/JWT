package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.ChangePasswordDto;
import kz.kalabay.jwtyt.model.dto.SimpleUser;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/rec")
    public ResponseEntity<?> getRecommendations(Principal principal) {
        if (principal == null) {
            logger.error("Principal is null");
            return ResponseEntity.status(401).body("User not authenticated");
        }
        logger.info("Principal name: {}", principal.getName());
        return ResponseEntity.ok(userService.getRecommendationUsers(principal.getName()));
    }
    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable(value = "id") Long id) {
        return userService.getUserByIdDto(id);
    }
    @PostMapping("/post")
    public ResponseEntity<String> post(
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file,
            Principal principal) {
        Post post = new Post(content);
        logger.info("Creating post for user: {}", principal.getName());
        return userService.post(principal.getName(), post, file);
    }
    @PostMapping("/search")
    public List<UserDto> searchUser(@RequestBody String search ) {
        List<UserDto> users= userService.searchUsers(search);
        return users;
    }
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto changePasswordDto,Principal principal) {
        if(!changePasswordDto.getUsername().equals(principal.getName())){
            return ResponseEntity.badRequest().body("username are not match");
        }
        return userService.changePassword(changePasswordDto);
    }
    @GetMapping("/partner/{id}")
    public SimpleUser fetchUserById(@PathVariable("id") Long id,Principal principal) {
        return userService.fetchUser(id, principal.getName());
    }
    @PostMapping("change-photo")
    public String changePhoto(@RequestParam("file") MultipartFile file,Principal principal) throws IOException {
        return userService.changePhoto(file, principal.getName());
    }
}