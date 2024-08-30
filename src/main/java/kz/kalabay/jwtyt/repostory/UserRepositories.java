package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepositories extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findAllById(Long id);
    List<User> findByUsernameContainingIgnoreCase(String username);
    @Query("SELECT u FROM User u WHERE u.username != :username AND u.username NOT IN " +
            "(SELECT f.username FROM User u2 JOIN u2.friends f WHERE u2.username = :username)")
    List<User> findAllByNotUsernameAndNotFriends(@Param("username") String username);
}
