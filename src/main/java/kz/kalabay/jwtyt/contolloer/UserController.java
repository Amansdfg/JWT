package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.services.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable(value = "id") Long id) {
        UserDto userDto = userService.getUserByIdDto(id);
        logger.info(userDto.toString());
        return userDto;
    }
    @PostMapping("/post")
    public ResponseEntity<String> post(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file,
            Principal principal) {
        Post post = new Post(title,content);
        logger.info("Creating post for user: {}", principal.getName());
        return userService.post(principal.getName(), post, file);
    }
    @GetMapping("/rec/info")
    public List<UserDto> getRecommendations(Principal principal) {
        if (principal == null) {
            logger.error("Principal is null");
            throw new IllegalStateException("Principal cannot be null");
        }
        logger.info("Principal name: {}", principal.getName());
        return userService.getRecommendationUsers(principal.getName());
    }
}
