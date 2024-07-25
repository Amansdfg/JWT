package kz.kalabay.jwtyt.model.dto;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Table(name="header")
@Data
public class Header {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String href;
    private String name;
}
