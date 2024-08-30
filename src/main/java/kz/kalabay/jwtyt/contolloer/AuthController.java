package kz.kalabay.jwtyt.contolloer;
import kz.kalabay.jwtyt.model.dto.JwtRequest;
import kz.kalabay.jwtyt.model.dto.RegistrationUserDto;
import kz.kalabay.jwtyt.services.AuthService;
import kz.kalabay.jwtyt.services.MailSenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/aman")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private  final MailSenderService mailSenderService;
    @PostMapping("/auth")
    public ResponseEntity<?> createToken(@RequestBody JwtRequest jwtRequest) {
        return authService.createAuthToken(jwtRequest);
    }
    @PostMapping("/registration")
    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        return authService.createNewUser(registrationUserDto);
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassPassword(@RequestBody Map<String,String> request) {
        String email = request.get("email");
        String token=authService.generatePasswordResetToken(email);
        mailSenderService.sendMail(email,token);
        return ResponseEntity.ok(Map.of("message", "Reset link sent to your email"));
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");
        authService.resetPassword(token, newPassword);
        return ResponseEntity.ok(Map.of("message", "Password successfully reset"));
    }

}
