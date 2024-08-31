package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.dto.ChatUrl;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IndChatMapper {
    ChatUrl mapToChatUrl(IndividualChat individualChat);
    List<ChatUrl> mapToChatUrls(List<IndividualChat> individualChats);
}
