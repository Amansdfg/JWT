package kz.kalabay.jwtyt.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    private User sender;
    @ManyToOne(fetch = FetchType.EAGER)
    private User receiver;
}
