package kz.kalabay.jwtyt.model;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="indChats")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IndividualChat{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String chatStatus;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user1;
    @ManyToOne(fetch = FetchType.EAGER)
    private User user2;
    private LocalDateTime date;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Message> messages;

}
