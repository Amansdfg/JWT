package kz.kalabay.jwtyt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="posts")
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @ManyToOne(fetch = FetchType.EAGER)
//    private Photo photo;
    private String title;
    private String content;
}
