package kz.kalabay.jwtyt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Table(name="posts")
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String  photoUrl;
    @Column(length =1000)
    private String content;
    private LocalDateTime createdAt;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Comment> comments;
    public Post(String content) {
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }
}
