package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.Comment;
import kz.kalabay.jwtyt.model.dto.CommentDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MapperComment {
    CommentDto toDto(Comment comment);
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    CommentDto commentToCommentDto(Comment comment);

}
