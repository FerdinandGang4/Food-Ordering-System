package com.miufood.auth.service;

import com.miufood.auth.service.config.JwtService;
import com.miufood.auth.service.dto.LoginRequest;
import com.miufood.auth.service.dto.LoginResponse;
import com.miufood.auth.service.dto.RegisterRequest;
import com.miufood.auth.service.dto.RegisterResponse;
import com.miufood.auth.service.model.Role;
import com.miufood.auth.service.model.User;
import com.miufood.auth.service.repository.UserRepository;
import com.miufood.auth.service.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {
    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;
    @Test
    void register_shouldReturnConflict_whenEmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest(
                "Devendra",
                "devendra@gmail.",
                "test@1245",
                Role.CUSTOMER
        );

        when(repository.existsByEmail(request.getEmail())).thenReturn(true);

        ResponseEntity<?> response = authService.register(request);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        RegisterResponse body = (RegisterResponse) response.getBody();
        if(body != null) {
            assertFalse(body.getSuccess());
            assertEquals("EXISTED", body.getMessage());
        }

        verify(repository, never()).save(any());
    }

    @Test
    void register_shouldCreateUser_whenEmailDoesNotExist() {
        RegisterRequest request = new RegisterRequest(
                "Devendra",
                "devendra@gmail.com",
                "test@123",
                Role.VENDOR
        );

        when(repository.existsByEmail(request.getEmail())).thenReturn(false);
        when(encoder.encode(request.getPassword())).thenReturn("test@123");

        ResponseEntity<?> response = authService.register(request);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        RegisterResponse body = (RegisterResponse) response.getBody();
        if(body != null) {
            assertTrue(body.getSuccess());
            assertEquals("CREATED", body.getMessage());
        }
        verify(repository).save(any(User.class));
    }

    @Test
    void login_shouldReturnLoginResponse_whenCredentialsAreValid() {
        LoginRequest request = new LoginRequest("dev@hotmail.com", "max@123");

        User user = User.builder()
                .id(7L)
                .name("Devendra")
                .email("dev@hotmail.com")
                .password("encodedPassword")
                .build();

        when(repository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateTokenHavingUserId(user)).thenReturn("validtoken");

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("validtoken", response.getToken());
        assertEquals(7L, response.getUserId());
        assertEquals("Devendra", response.getName());
        assertTrue(response.getSuccess());

        verify(authenticationManager).authenticate(
                any(UsernamePasswordAuthenticationToken.class)
        );
    }
}
