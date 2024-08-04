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
    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable(value="id") Long id) {
        System.out.println(id);
        UserDto userDto=userService.getUserByIdDto(id);
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
        @RequestParam(value = "file",required = false) MultipartFile file,
        Principal principal) {
    System.out.println("Multipart: "+file);
    Post post = new Post();
    post.setTitle(title);
    post.setContent(content);
    System.out.println(post.toString());

    return userService.post(principal.getName(), post, file);
}
    @PostMapping("/postTest")
    public void postTest(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file")String file,
            Principal principal) {
        System.out.println("Multipart: "+file);
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        System.out.println(title);
        System.out.println(content);
        System.out.println(file);

    }
}
