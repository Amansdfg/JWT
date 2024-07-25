package kz.kalabay.jwtyt.services;


import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.RegistrationUserDto;
import kz.kalabay.jwtyt.repostory.RoleRepositories;
import kz.kalabay.jwtyt.repostory.UserRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepositories userRepositories;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    public Optional<User> findByUsername(String username) {
        return userRepositories.findByUsername(username);
    }
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(
                String.format("User %s not found", username)
        ));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList())
                );
    }
    public User createNewUser(RegistrationUserDto userDto) {
        User user=new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setEmail(userDto.getEmail());
        user.setRoles(List.of(roleService.getUserRole()));
        return userRepositories.save(user);

    }
}
