package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepositories extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
