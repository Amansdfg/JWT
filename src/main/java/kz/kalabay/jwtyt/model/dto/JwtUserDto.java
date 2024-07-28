package kz.kalabay.jwtyt.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtUserDto {
    private Long id;
    private String username;
    private String email;
}
