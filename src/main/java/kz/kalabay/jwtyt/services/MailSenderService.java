package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.model.dto.MailSendDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
public class MailSenderService {
    @Value("${spring.mail.username}")
    private String from;
    @Autowired
    private JavaMailSender sender;
    public void send(MailSendDto mailSendDto){
        SimpleMailMessage mailMessage=new SimpleMailMessage();
        mailMessage.setSentDate(new Date());
        mailMessage.setTo(mailSendDto.getTo());
        mailMessage.setSubject(mailSendDto.getSubject());
        mailMessage.setText(mailSendDto.getBody());
        mailMessage.setFrom(from);
        sender.send(mailMessage);
    }
}