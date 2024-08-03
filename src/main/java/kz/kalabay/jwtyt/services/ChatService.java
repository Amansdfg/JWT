package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.mapper.MessageMapper;
import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.repostory.RepositoryIndChat;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final RepositoryIndChat repositoryIndChat;
    private final MessageMapper mapper;
    public List<MessageDto> chat(User sender, User receiver) {
        return mapper.mapToDTOList(repositoryIndChat.findAllBySenderAndReceiverOrSenderAndReceiverOrderByDate(sender,receiver,receiver,sender));
    }
    public MessageDto sendMessage(IndividualChat individualChat) {
        return mapper.mapToDTO(repositoryIndChat.save(individualChat)) ;
    }

}
