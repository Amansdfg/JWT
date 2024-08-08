package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.Comment;
import kz.kalabay.jwtyt.model.dto.CommentDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MapperComment {
    CommentDto toDto(Comment comment);
    List<CommentDto> toDtoList(List<Comment> comment);
}
