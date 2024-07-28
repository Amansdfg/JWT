package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import kz.kalabay.jwtyt.services.ChatService;
import kz.kalabay.jwtyt.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

@RequestMapping(value = "/aman")
@RestController
@RequiredArgsConstructor
public class MainController{
    private final UserService userService;
    @GetMapping("/unsecured")
    public String unsecuredData(){
        return "Unsecured Data";
    }
    @GetMapping("/secured")
    public String securedData(){
        return "Secured Data";
    }
    @GetMapping("/admin")
    public String admin(){
        return "Admin";
    }
    @GetMapping("/info")
    public UserDto userData(Principal principal){
      return   userService.getUserByUsername(principal.getName());
    }
}
