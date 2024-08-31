package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.Message;
import kz.kalabay.jwtyt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySenderAndReceiverOrSenderAndReceiverOrderByDate(User from1, User to1, User from2, User to2);
}
