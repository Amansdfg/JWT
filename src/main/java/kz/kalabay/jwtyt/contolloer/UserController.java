package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.services.UserService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/friends")
    public List<UserDto> getFriends(Principal principal) {
        return userService.getAllFriend(principal.getName());
    }
    @GetMapping("/all")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable(value = "id") Long id) {
        System.out.println(id);
        UserDto userDto = userService.getUserByIdDto(id);
        System.out.println(userDto.toString());
        return userDto;
    }


    //    @PostMapping("post")
//    public ResponseEntity<String> post(@RequestBody  Post post, Principal principal) {
//        System.out.println(post);
//        return userService.post(principal.getName(),post);
//    }
    @PostMapping("/post")
    public ResponseEntity<String> post(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file,
            Principal principal) {
        Post post = new Post(title,content);
        return userService.post(principal.getName(), post, file);
    }
}
