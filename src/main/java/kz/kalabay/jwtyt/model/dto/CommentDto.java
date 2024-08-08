package kz.kalabay.jwtyt.model.dto;

import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private String text;
    private UserDto userDto;
}
