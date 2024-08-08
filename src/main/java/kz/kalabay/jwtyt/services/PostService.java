package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.repostory.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PostService{
    @Autowired
    private  PostRepository postRepository;
    private static final String UPLOAD_DIR = "images/";
    public void savePost(Post post) {
         postRepository.save(post);
    }
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }
    @Transactional
    public void savePostWithImage(Post post, MultipartFile file) throws IOException {
        postRepository.save(post);
        if (file != null && !file.isEmpty()) {
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            System.out.println(path);
            post.setPhotoUrl(UPLOAD_DIR + file.getOriginalFilename());
            postRepository.save(post);
        }else{
            System.out.println("file is not uploaded");
        }
    }
}
