package kz.kalabay.jwtyt.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name="groupChats")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GroupChat extends Chat{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String chatStatus;
    @ManyToOne(fetch = FetchType.EAGER)
    private User sender;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> receivers;
    private LocalDateTime date;
    @Column(length = 20000)
    private String text;
}
