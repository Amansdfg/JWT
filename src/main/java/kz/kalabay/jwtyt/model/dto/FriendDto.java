package kz.kalabay.jwtyt.model.dto;
//import kz.kalabay.jwtyt.model.Photo;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FriendDto {
    private Long id;
    private String username;
    private String email;
    private List<Role> roles;
    private List<Post> posts;
}
