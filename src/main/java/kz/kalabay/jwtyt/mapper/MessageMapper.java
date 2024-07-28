package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.model.dto.UserDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    MessageDto mapToDTO(IndividualChat user);
    List<MessageDto> mapToDTOList(List<IndividualChat> users);
}
