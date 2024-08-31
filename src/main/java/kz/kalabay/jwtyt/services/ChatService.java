package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.mapper.IndChatMapper;
import kz.kalabay.jwtyt.mapper.MessageMapper;
import kz.kalabay.jwtyt.mapper.UserMapper;
import kz.kalabay.jwtyt.mapper.UserSimpleDto;
import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.Message;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.ChatUrl;
import kz.kalabay.jwtyt.model.dto.MessageDto;
import kz.kalabay.jwtyt.model.dto.SimpleUser;
import kz.kalabay.jwtyt.repostory.MessageRepository;
import kz.kalabay.jwtyt.repostory.RepositoryIndChat;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final RepositoryIndChat repositoryIndChat;
    private final MessageRepository messageRepository;
    private final UserRepositories userRepositories;
    private final UserMapper userMapper;
    private final MessageMapper mapper;
    private final UserSimpleDto userSimpleDtoMapper;
    private final IndChatMapper indChatMapper;
    public List<MessageDto> chat(Long id) {
        return mapper.mapToDTOList(repositoryIndChat.findAllById(id).orElseThrow(()->new RuntimeException("Not Found")).getMessages());
    }
    public MessageDto sendMessage(Long chatId,Message message) {
        Message tempMessage=messageRepository.save(message);
        IndividualChat individualChat=repositoryIndChat.findAllById(chatId).orElseThrow( () -> new RuntimeException("Not found"));
        List<Message> messages=individualChat.getMessages();
        messages.add(tempMessage);
        individualChat.setMessages(messages);
        repositoryIndChat.save(individualChat);
        return mapper.mapToDTO(tempMessage);
    }
    public List<ChatUrl> individualChats(String username){
        List<IndividualChat> individualChat=repositoryIndChat.findAllByUser1UsernameOrUser2Username(username,username);
        List<ChatUrl> chatUrls=new ArrayList<>();
        for(IndividualChat indChat:individualChat){
            ChatUrl chatUrl=indChatMapper.mapToChatUrl(indChat);
            if(indChat.getUser1().getUsername().equals(username)){
                chatUrl.setUser(userSimpleDtoMapper.mapToDTO(indChat.getUser2()));
            }else{
                chatUrl.setUser(userSimpleDtoMapper.mapToDTO(indChat.getUser1()));
            }
            chatUrls.add(chatUrl);
        }
        return chatUrls;
    }
    public ChatUrl individualChat(Long chatId,String username){
        User user1=userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("Not found"));
        User user2=userRepositories.findById(chatId).orElseThrow(()->new RuntimeException("Not found"));
        IndividualChat individualChat=new IndividualChat();
        individualChat.setUser1(user1);
        individualChat.setUser2(user2);
        return indChatMapper.mapToChatUrl(repositoryIndChat.save(individualChat));
    }
    public SimpleUser partnerChat(Long chatId,String username){
        User user1=userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("Not found"));
        User user2=userRepositories.findById(chatId).orElseThrow(()->new RuntimeException("Not found"));
    }
}
