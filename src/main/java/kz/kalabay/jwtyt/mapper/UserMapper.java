package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.FriendDto;
import java.util.List;

import kz.kalabay.jwtyt.model.dto.UserDto;
import org.mapstruct.Mapper;
@Mapper(componentModel = "spring")

public interface UserMapper {
    UserDto mapToDTO(User user);
    List<UserDto> mapToDTOList(List<User> users);
}

