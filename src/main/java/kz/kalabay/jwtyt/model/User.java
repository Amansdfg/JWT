package kz.kalabay.jwtyt.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Table(name="users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true,name = "username",nullable=false)
    private String username;
    @Column(name = "password",nullable=false)
    private String password;
    @Column(name = "email",nullable=false)
    private String email;
    private String firstName;
    private String lastName;
    private String photo;
    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name="roles_id")
    )
    private List<Role> roles;
    @ManyToMany
    @JoinTable(
            name = "users_friends",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name="friends_id")
    )
    private List<User> friends;
    @ManyToMany
    @JoinTable(
            name = "users_posts",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name="posts_id")
    )
    private List<Post> posts;
}
