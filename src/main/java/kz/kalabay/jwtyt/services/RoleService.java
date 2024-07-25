package kz.kalabay.jwtyt.services;


import kz.kalabay.jwtyt.model.Role;
import kz.kalabay.jwtyt.repostory.RoleRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepositories roleRepository;
    public Role getUserRole() {
        return roleRepository.findByName("ROLE_USER").get();
    }
}