package kz.kalabay.jwtyt.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ChatMessage {
    private String nickname;
    private String content;
    private Date timestamp;
}
