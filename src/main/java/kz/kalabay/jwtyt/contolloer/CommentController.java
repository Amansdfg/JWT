package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.Comment;
import kz.kalabay.jwtyt.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @PostMapping("/{id}")
    public Comment createComment(Principal principal, @RequestBody String text, @PathVariable("id") Long id) {
        System.out.println("Name " +principal.getName());
        System.out.println("Text " +text);
        System.out.println("Id " +id);
        return commentService.saveComment(id,principal.getName(),text);
    }
}
