package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.repostory.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService{
    @Autowired
    private  PostRepository postRepository;
    public void savePost(Post post) {
         postRepository.save(post);
    }
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }
}
