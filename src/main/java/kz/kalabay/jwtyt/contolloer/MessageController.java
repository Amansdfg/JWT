package kz.kalabay.jwtyt.contolloer;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
@RequiredArgsConstructor
public class MessageController {
    private final ChatService chatService;
    @MessageMapping("/chat/{id}")
    @SendTo("/topic/messages/{id}")
    public MessageDto sendMessage(@Payload Map<String,String> message){
        try {
            return chatService.sendMessage(message);
        }catch (NumberFormatException e){
            System.out.println("Invalid id");
            throw new IllegalArgumentException("ID must be a valid number.");
        }
    }
}
