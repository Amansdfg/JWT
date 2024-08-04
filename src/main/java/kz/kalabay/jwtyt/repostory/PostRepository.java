package kz.kalabay.jwtyt.repostory;

import kz.kalabay.jwtyt.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
