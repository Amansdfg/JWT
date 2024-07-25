package kz.kalabay.jwtyt.contolloer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RequestMapping(value = "/aman")
@RestController
@RequiredArgsConstructor
public class MainController{
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
    public String userData(Principal principal){
        return principal.getName();
    }
}
