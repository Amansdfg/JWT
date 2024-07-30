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
@ToString
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
    @ManyToMany
    @JoinTable(
            name = "users_photos",
            joinColumns = @JoinColumn(name = "users_id"),
            inverseJoinColumns = @JoinColumn(name="photos_id")
    )
    private List<Photo> photos;
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
}
