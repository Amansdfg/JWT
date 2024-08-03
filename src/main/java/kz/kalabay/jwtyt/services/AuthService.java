package kz.kalabay.jwtyt.services;

import kz.kalabay.jwtyt.exceptions.AppError;
import kz.kalabay.jwtyt.model.User;
import kz.kalabay.jwtyt.model.dto.*;
import kz.kalabay.jwtyt.utils.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtTokenUtils jwtTokenUtils;
    private final AuthenticationManager authenticationManager;
    public ResponseEntity<?> createAuthToken(JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.value(), "Incorrect username or password"), HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());
        String token = jwtTokenUtils.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }
    public ResponseEntity<?> createNewUser(RegistrationUserDto userDto) {
        if (!userDto.getPassword().equals(userDto.getConfirmPassword())) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(),"password and confirm password do not match"), HttpStatus.BAD_REQUEST);
        }
        if(userService.findByUsername(userDto.getEmail()).isPresent()) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), "Username already exists"), HttpStatus.BAD_REQUEST);
        }
        User user=userService.createNewUser(userDto);
        return ResponseEntity.ok(new JwtUserDto(user.getId(),user.getUsername(),user.getEmail()));
    }
}
