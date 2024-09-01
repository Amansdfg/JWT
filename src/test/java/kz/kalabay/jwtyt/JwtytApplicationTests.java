package kz.kalabay.jwtyt;

import kz.kalabay.jwtyt.contolloer.MessageController;
import kz.kalabay.jwtyt.model.Message;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import kz.kalabay.jwtyt.services.ChatService;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class JwtytApplicationTests {
//    @Autowired
//    private SimpMessagingTemplate template;

    @Autowired
    private ChatService chatService;

    @Test
    public void testSendMessage() {
        MessageController controller = new MessageController(chatService);
        User user = new User();
        Message message = new Message();
        message.setText("Test message");
        message.setSender(user);

        MessageDto result = controller.sendMessage(1L, message);
        assertNotNull(result);
        assertEquals("Test message", result.getText());
        assertEquals("TestUser", result.getSender());
    }
    @Test
    void contextLoads() {
    }

}
