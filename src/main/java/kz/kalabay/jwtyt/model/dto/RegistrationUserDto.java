package kz.kalabay.jwtyt.model.dto;

import lombok.Data;

@Data
public class RegistrationUserDto {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String confirmPassword;
    private String email;
}
