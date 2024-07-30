package kz.kalabay.jwtyt.model;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
@Table(name="roles")
@ToString
public class Role {
    @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

}
