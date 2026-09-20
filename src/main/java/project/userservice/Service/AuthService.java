package project.userservice.Service;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.userservice.DTO.*;
import project.userservice.Enum.Role;
import project.userservice.ExceptionHandler.ResourceAlreadyExistsException;
import project.userservice.ExceptionHandler.ResourceNotFoundException;
import project.userservice.Model.User;
import project.userservice.Repository.UserRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public ResponseEntity<LoginResponse> login(@Valid  LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String token = jwtService.generateToken(user);

        ResponseCookie cookie = org.springframework.http.ResponseCookie
                .from("accessToken", token)
                .httpOnly(true)
                .secure(false) // true in production with HTTPS
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        LoginResponse response = new LoginResponse(
                user.getEmail()
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    // REGISTER
    public ResponseEntity<RegisterResponse> register(@Valid RegisterRequest userReq) {

        // Check if email already exists
        if (userRepository.existsByEmail(userReq.getEmail())) {
            throw new ResourceAlreadyExistsException("Email already registered");
        }

        if(!Objects.equals(userReq.getPassword(), userReq.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        // Encrypt password
        userReq.setPassword(
                passwordEncoder.encode(userReq.getPassword())
        );

        User user = new User();
        user.setName(userReq.getName());
        user.setEmail(userReq.getEmail());
        user.setPassword(userReq.getPassword());
        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());

        // Save user
        User savedUser = userRepository.save(user);

        // Generate JWT
        String token =  jwtService.generateToken(savedUser);
        ResponseCookie cookie = ResponseCookie
                .from("accessToken", token)
                .httpOnly(true)
                .secure(false) // true in production with HTTPS
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        RegisterResponse response = new RegisterResponse(
                savedUser.getName(),
                savedUser.getEmail()
        );

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.SET_COOKIE,
                        cookie.toString()
                )
                .body(response);
    }


    public GetUser getUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found")
                );

        return GetUser.builder()
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    public void logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie
                .from("accessToken", "")
                .httpOnly(true)
                .secure(false) // true in production
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ZERO)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }


}