package kz.kalabay.jwtyt.mapper;

import kz.kalabay.jwtyt.model.dto.PostDto;
import org.mapstruct.Mapper;
import kz.kalabay.jwtyt.model.Post;
import java.util.List;
@Mapper(componentModel = "spring")
public interface PostMapper {
    PostDto toPostDto(Post post);
    List<PostDto> toPostDtoList(List<Post> posts);
}
