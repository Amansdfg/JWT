package kz.kalabay.jwtyt.model;

import jakarta.persistence.*;
import kz.kalabay.jwtyt.model.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 300, nullable = false)
    private String text;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
}
