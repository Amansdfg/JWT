package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.dto.ChangePasswordDto;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        UserDto userDto = userService.getUserByIdDto(id);
        logger.info(userDto.toString());
        return userDto;
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
        System.out.println(users);
        return users;
    }
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto changePasswordDto,Principal principal) {
        System.out.println(changePasswordDto);
        System.out.println(principal);
        if(!changePasswordDto.getUsername().equals(principal.getName())){
            return ResponseEntity.badRequest().body("username are not match");
        }
        return userService.changePassword(changePasswordDto);
    }
}
