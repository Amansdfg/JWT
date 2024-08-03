package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.dto.ChatMessage;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Date;

@Controller
@RequiredArgsConstructor
public class ChatContr {
    private final ChatService chatService;
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public MessageDto sendMessage(@Payload IndividualChat message) {
        message.setDate(LocalDateTime.now());
        System.out.println(message);
        return chatService.sendMessage(message);
    }
}
