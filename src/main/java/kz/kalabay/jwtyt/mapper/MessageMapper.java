package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.Message;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    MessageDto mapToDTO(Message user);
    List<MessageDto> mapToDTOList(List<Message> users);
}
