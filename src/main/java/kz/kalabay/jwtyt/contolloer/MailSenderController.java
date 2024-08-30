package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.dto.MailSendDto;
import kz.kalabay.jwtyt.services.MailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MailSenderController {
    private final MailSenderService mailSender;
    @PostMapping("/mail/send")
    public void sendMail(@RequestBody MailSendDto mailSendDto ) {
        mailSender.send(mailSendDto);
    }
}
