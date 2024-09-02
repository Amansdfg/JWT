package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.mapper.UserMapper;
import kz.kalabay.jwtyt.model.Request;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.RequestDto;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.repostory.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {
    private final RequestRepository requestRepository;
    private final UserService userService;
    private final UserMapper userMapper;
    public String sendRequest(RequestDto requestDto, String username) {
        User sender=userService.getByUsername(username);
        User receiver=userService.getUserById(requestDto.getReceiverId());
        Request exits=requestRepository.findAllBySenderAndReceiver(sender,receiver);
        if(exits!=null){
            return "All ready sent a request";
        }
        if(sender!=null && receiver!=null) {
            Request request=new Request();
            request.setSender(sender);
            request.setReceiver(receiver);
            requestRepository.save(request);
            return "Successfully sent request";
        }
        return "Sender or Receiver not found";
    }
    public List<UserDto> getRequest(String username) {
        User receiver=userService.getByUsername(username);
        List<Request> users=requestRepository.findRequestsByReceiver_Id(receiver.getId());
        List<User> userDtos=new ArrayList<>();
        for(Request request:users) {
            userDtos.add(request.getSender());
        }
        return userMapper.mapToDTOList(userDtos);
    }
    public String acceptRequest(RequestDto requestDto,String username) {
        User user=userService.getByUsername(username);
        User sender=userService.getByUsername(requestDto.getSenderUsername());
        List<User> friends=user.getFriends();
        friends.add(sender);
        user.setFriends(friends);
        List<User> friends1=sender.getFriends();
        friends1.add(user);
        sender.setFriends(friends1);
        userService.saveUser(user);
        userService.saveUser(sender);
        Request request=requestRepository.findAllBySenderAndReceiver(sender,user);
        if(request!=null){
            requestRepository.delete(request);
        }
        return "Successfully added";
    }
}
