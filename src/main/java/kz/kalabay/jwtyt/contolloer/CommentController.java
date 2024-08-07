package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Comment;
import kz.kalabay.jwtyt.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @PostMapping("{id}")
    public Comment createComment(Principal principal, Comment comment, @PathVariable("id") Long id) {
        return commentService.saveComment(id,principal.getName(),comment);
    }
}
