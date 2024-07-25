package kz.kalabay.jwtyt.contolloer;

import kz.kalabay.jwtyt.model.dto.Header;
import kz.kalabay.jwtyt.repostory.HeaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/header")
@RequiredArgsConstructor
public class HeaderController {
    private final HeaderRepository repository;
    @GetMapping
    public List<Header> getHeaders() {
        return repository.findAll();
    }
}
