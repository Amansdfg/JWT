package kz.kalabay.jwtyt.exceptions;

import lombok.Data;

@Data
public class NotFound extends RuntimeException {
    public NotFound(String message) {
        super(message);
    }
}
