package kz.kalabay.jwtyt.model.dto;

import lombok.Data;

@Data
public class SimpleUser {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String photo;
    private String email;
}
