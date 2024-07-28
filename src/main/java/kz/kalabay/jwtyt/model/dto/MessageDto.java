package kz.kalabay.jwtyt.model.dto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto{
    private Long id;
    private String chatStatus;
    private UserDto sender;
    private UserDto receiver;
    private LocalDateTime date;
    private String text;
}
