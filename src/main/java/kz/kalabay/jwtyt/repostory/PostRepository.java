package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findPostById(Long id);
}
