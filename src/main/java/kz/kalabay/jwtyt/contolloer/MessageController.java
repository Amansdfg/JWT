package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Message;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import java.time.LocalDateTime;
@Controller
@RequiredArgsConstructor
public class MessageController {
    private final ChatService chatService;
    @MessageMapping("/chat/{id}")
    @SendTo("/topic/messages/{id}")
    public MessageDto sendMessage(@PathVariable("id")Long id, Message message){
        System.out.println(message);
        System.out.println(id);

        message.setDate(LocalDateTime.now());
        return chatService.sendMessage(id,message);
    }
}
