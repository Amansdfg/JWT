package kz.kalabay.jwtyt.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class PostDto {
    private Long id;
    private String  photoUrl;
    private String content;
    private LocalDateTime createdAt;
    private List<CommentDto> comments;
}
