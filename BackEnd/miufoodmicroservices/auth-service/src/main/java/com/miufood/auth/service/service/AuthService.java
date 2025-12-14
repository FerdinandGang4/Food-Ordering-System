package com.miufood.auth.service.service;

import com.miufood.auth.service.config.JwtService;
import com.miufood.auth.service.dto.RegisterResponse;
import com.miufood.auth.service.dto.LoginRequest;
import com.miufood.auth.service.dto.LoginResponse;
import com.miufood.auth.service.dto.RegisterRequest;
import com.miufood.auth.service.exception.UserNotFoundException;
import com.miufood.auth.service.model.User;
import com.miufood.auth.service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> register(RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())) {
            return new ResponseEntity<>(new RegisterResponse("EXISTED", false), HttpStatus.CONFLICT);
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        repository.save(user);

        return new ResponseEntity<>(new RegisterResponse("CREATED", true), HttpStatus.CREATED);
    }

    public LoginResponse login(LoginRequest request) {
        User user = repository.findByEmail(request.getEmail()).orElseThrow(() -> new UserNotFoundException("User not found"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateTokenHavingUserId(user);

        return new LoginResponse(token, user.getId(), user.getName(), true);
    }

}
