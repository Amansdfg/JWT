package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.dto.RequestDto;
import kz.kalabay.jwtyt.model.dto.UserDto;
import kz.kalabay.jwtyt.services.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/request")
@RequiredArgsConstructor
public class RequestController {
    private final RequestService requestService;
    @PostMapping
    public String sendRequest(@RequestBody RequestDto requestDto, Principal principal) {
        return requestService.sendRequest(requestDto,principal.getName());
    }
    @GetMapping
    public List<UserDto> getRequests(Principal principal) {
        return requestService.getRequest(principal.getName());
    }
}
