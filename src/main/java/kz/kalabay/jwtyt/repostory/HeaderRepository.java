package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.dto.Header;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeaderRepository extends JpaRepository<Header, Long> {
}
