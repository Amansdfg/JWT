package kz.kalabay.jwtyt.model.dto;

import jakarta.persistence.*;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.Role;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String photo;
    private String email;
    private List<Role> roles;
    private List<FriendDto> friends;
    private List<PostDto> posts;
}
