package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.IndividualChat;
import kz.kalabay.jwtyt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositoryIndChat extends JpaRepository<IndividualChat,Long>{
    List<IndividualChat> findAllBySenderAndReceiverOrSenderAndReceiverOrderByDate(User from1, User to1, User from2, User to2);
}
