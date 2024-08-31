package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.IndividualChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositoryIndChat extends JpaRepository<IndividualChat,Long>{
//    List<IndividualChat> findAllBySenderAndReceiverOrSenderAndReceiverOrderByDate(User from1, User to1, User from2, User to2);
    Optional<IndividualChat> findAllById(Long id);
    List<IndividualChat> findAllByUser1UsernameOrUser2Username(String username,String use);
//    Optional<IndividualChat> findAllByUser1UsernameAndUser2IdOrUser2UsernameAndUser1Id(String username1,Long id1,String username,Long id);
//    Optional<IndividualChat> findAllByUser1Username(String username);

}
