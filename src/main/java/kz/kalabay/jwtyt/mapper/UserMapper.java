package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.Comment;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.CommentDto;
import kz.kalabay.jwtyt.model.dto.FriendDto;
import java.util.List;

import kz.kalabay.jwtyt.model.dto.PostDto;
import kz.kalabay.jwtyt.model.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface UserMapper {
    UserDto mapToDTO(User user);
    List<UserDto> mapToDTOList(List<User> users);
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    CommentDto commentToCommentDto(Comment comment);
}

