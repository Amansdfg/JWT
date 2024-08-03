package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.services.ChatService;
import kz.kalabay.jwtyt.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final UserService userService;
    @GetMapping("/chat/{id}")
    public List<MessageDto> chatData(Principal principal, @PathVariable(name="id")Long id){
        User sender=userService.getByUsername(principal.getName());
        User receiver=userService.getUserById(id);
        return chatService.chat(sender,receiver);
    }
}

