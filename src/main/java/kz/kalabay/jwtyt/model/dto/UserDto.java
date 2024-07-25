package kz.kalabay.jwtyt.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserDto {
    private   Long id;
    private   String username;
    private String email;
}
