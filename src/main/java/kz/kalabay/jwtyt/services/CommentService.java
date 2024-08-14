package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.mapper.MapperComment;
import kz.kalabay.jwtyt.model.Comment;
import kz.kalabay.jwtyt.model.Post;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.CommentDto;
import kz.kalabay.jwtyt.repostory.CommentRepository;
import kz.kalabay.jwtyt.repostory.PostRepository;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private  CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepositories userRepositories;
    @Autowired
    private MapperComment mapperComment;
    public CommentDto saveComment(Long postId, String username, String text) {
        Comment comment = new Comment();
        comment.setText(text);
        System.out.println("postId: " + postId);
        System.out.println("username: " + username);
        System.out.println("comment: " + text);
        User user=userRepositories.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
        comment.setUser(user);
        commentRepository.save(comment);
        Post post=postRepository.findById(postId).orElseThrow(()->new RuntimeException("Comment not found"));
        List<Comment>comments=post.getComments();
        comments.add(comment);
        post.setComments(comments);
        postRepository.save(post);
        return mapperComment.commentToCommentDto(comment);
    }
}
