package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.model.Comment;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.repostory.CommentRepository;
import kz.kalabay.jwtyt.repostory.PostRepository;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private  CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepositories userRepositories;
    public Comment saveComment(Long postId,String username, Comment comment) {
        User user=userRepositories.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
        commentRepository.save(comment);
        Post post=postRepository.findById(postId).orElseThrow(()->new RuntimeException("Comment not found"));
        List<Comment>comments=post.getComments();
        comments.add(comment);
        post.setComments(comments);
        postRepository.save(post);
        return comment;

    }
}
