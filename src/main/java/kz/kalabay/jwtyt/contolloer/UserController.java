package kz.kalabay.jwtyt.contolloer;

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
    public UserDto getUser(@PathVariable(name="id") Long id) {
        return userService.getUserByIdDto(id);
    }
}
