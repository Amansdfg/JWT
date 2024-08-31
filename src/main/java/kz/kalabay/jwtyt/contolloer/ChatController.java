package kz.kalabay.jwtyt.contolloer;
import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.dto.ChatUrl;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    @GetMapping("/chat/{id}")
    public List<MessageDto> chatData(@PathVariable("id")String id){
        return chatService.chat(Long.parseLong(id));
    }
    @GetMapping("/chats")
    public List<ChatUrl> chats(Principal principal){
        return chatService.individualChats(principal.getName());
    }
    @PostMapping("/chat/{id}")
    public ChatUrl addChat(@PathVariable("id")Long id, Principal principal){
        return chatService.individualChat(id, principal.getName());
    }
}