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
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final RepositoryIndChat repositoryIndChat;
    private final MessageRepository messageRepository;
    private final UserRepositories userRepositories;
    private final MessageMapper mapper;
    private final UserSimpleDto userSimpleDtoMapper;
    private final IndChatMapper indChatMapper;
    public List<MessageDto> chat(Long id) {
        return mapper.mapToDTOList(repositoryIndChat.findAllById(id).orElseThrow(()->new RuntimeException("Not Found")).getMessages());
    }
    public MessageDto sendMessage(Map<String,String> message) {
        Long chatId=Long.parseLong(message.get("chatId"));
        Long senderId=Long.parseLong(message.get("sender"));
        String text=message.get("text");

        Message message1=new Message();
        message1.setSender(userRepositories.findAllById(senderId).orElseThrow(()->new RuntimeException("Not Found")));
        message1.setText(text);
        IndividualChat individualChat=repositoryIndChat.findAllById(chatId).orElseThrow(()->new RuntimeException("Not Found"));
        User receiver;
        if(individualChat.getUser1().getId().equals(senderId)){
            receiver=individualChat.getUser2();
        }else{
            receiver=individualChat.getUser1();
        }
        message1.setReceiver(receiver);
        messageRepository.save(message1);
        List<Message> messages=individualChat.getMessages();
        messages.add(message1);
        individualChat.setMessages(messages);
        repositoryIndChat.save(individualChat);
        return mapper.mapToDTO(message1);
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
    public ChatUrl individualChat(Long Id,String username){
        User user1=userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("Not found"));
        User user2=userRepositories.findById(Id).orElseThrow(()->new RuntimeException("Not found"));
        IndividualChat individualChatExist=repositoryIndChat.findAllByUser1UsernameAndUser2IdOrUser1IdAndUser1Username(username,Id,Id,username);
        if(individualChatExist!=null){
            return indChatMapper.mapToChatUrl(individualChatExist);
        }
        IndividualChat individualChat=new IndividualChat();
        individualChat.setUser1(user1);
        individualChat.setUser2(user2);
        return indChatMapper.mapToChatUrl(repositoryIndChat.save(individualChat));
    }
//    public SimpleUser partnerChat(Long chatId,String username){
//        User user1=userRepositories.findByUsername(username).orElseThrow(()->new RuntimeException("Not found"));
//        User user2=userRepositories.findById(chatId).orElseThrow(()->new RuntimeException("Not found"));
//    }
}
