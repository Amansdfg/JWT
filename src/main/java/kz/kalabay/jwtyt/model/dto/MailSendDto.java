package kz.kalabay.jwtyt.model.dto;

import lombok.Data;

@Data
public class MailSendDto {
    private String to;
    private String subject;
    private String body;

}
