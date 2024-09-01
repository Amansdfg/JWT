package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.IndividualChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositoryIndChat extends JpaRepository<IndividualChat,Long>{
    Optional<IndividualChat> findAllById(Long id);
    List<IndividualChat> findAllByUser1UsernameOrUser2Username(String username,String use);
    IndividualChat findAllByUser1UsernameAndUser2IdOrUser1IdAndUser1Username(String username,Long id,Long ids,String use);
}
