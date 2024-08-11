package kz.kalabay.jwtyt.model.dto;

import lombok.Data;

@Data
public class RequestDto {
    private Long receiverId;
    private String senderUsername;
}
