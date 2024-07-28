package kz.kalabay.jwtyt.model.dto;

import jakarta.persistence.*;

import kz.kalabay.jwtyt.model.Photo;
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
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private List<Role> roles;
    private List<Photo>photos;
    private List<FriendDto> friends;
}
