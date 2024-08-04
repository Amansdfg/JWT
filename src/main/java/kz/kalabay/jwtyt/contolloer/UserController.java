package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("post")
    public void post(@RequestBody  Post post,Principal principal) {
        userService.post(principal.getName(),post);
    }
}
