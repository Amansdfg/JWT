package kz.kalabay.jwtyt.services;

import jakarta.mail.internet.MimeMessage;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.MailSendDto;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.messaging.MessagingException;
import org.springframework.stereotype.Service;
import java.util.Date;
@Service
public class MailSenderService {
    @Value("${spring.mail.username}")
    private String from;
    @Autowired
    private JavaMailSender sender;
    @Autowired
    private UserRepositories userRepositories;
    public void sendMail(String email, String token) throws MessagingException, jakarta.mail.MessagingException {
        String resetLink = "http://localhost:5173/auth/reset-password/" + token;
        MailSendDto message = new MailSendDto();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setBody("<html><body style='margin: 0; padding: 0;'>" +
                "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px;'>" +
                "<h1 style='font-size: 24px; color: #007bff;'>Password Reset Request</h1>" +
                "<p style='font-size: 16px;'>Click the link below to reset your password:</p>" +
                "<a href='" + resetLink + "' style='display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;'>Reset Password</a>" +
                "<p style='font-size: 14px; color: #666;'>If you did not request this, please ignore this email.</p>" +
                "<img src='cid:image001' style='display: block; margin-top: 20px; width: 100%; max-width: 600px;' alt='Sample Image'/>" +
                "</div>" +
                "</body></html>");
        send(message);
    }
    public void send(MailSendDto mailSendDto) throws MessagingException, jakarta.mail.MessagingException {
        User user=userRepositories.findByEmail(mailSendDto.getTo()).orElseThrow(()->new jakarta.mail.MessagingException("User with email doestnt exist"));
        MimeMessage mimeMessage = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setSentDate(new Date());
        helper.setTo(mailSendDto.getTo());
        helper.setSubject(mailSendDto.getSubject());
        helper.setText(mailSendDto.getBody(), true);
        helper.setFrom(from);

        sender.send(mimeMessage);
    }
}