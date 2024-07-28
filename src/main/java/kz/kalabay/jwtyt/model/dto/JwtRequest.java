package kz.kalabay.jwtyt.model.dto;

import lombok.Data;
import org.springframework.web.bind.annotation.RequestMapping;

@Data
@RequestMapping
public class JwtRequest {
    private String username;
    private String password;
}
