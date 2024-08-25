package kz.kalabay.jwtyt.model.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private String username;
    private String oldPassword;
    private String newPassword;
    private String confirmationPassword;
}
