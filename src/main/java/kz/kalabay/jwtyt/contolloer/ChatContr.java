package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class ChatContr {
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(@Payload ChatMessage message) {
        message.setTimestamp(new Date());
        System.out.println(message);
        return message;
    }
}
