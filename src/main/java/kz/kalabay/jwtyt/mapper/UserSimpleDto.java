package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.SimpleUser;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserSimpleDto {
    SimpleUser mapToDTO(User user);
    List<SimpleUser> mapToDTOList(List<User> users);
}
