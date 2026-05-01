package com.tuempresa.signlang.service;

import com.tuempresa.signlang.dto.LoginRequest;
import com.tuempresa.signlang.dto.LoginResponse;
import com.tuempresa.signlang.dto.RegisterRequest;
import com.tuempresa.signlang.entity.User;
import com.tuempresa.signlang.repository.TranslationHistoryRepository;
import com.tuempresa.signlang.repository.UserRepository;
import com.tuempresa.signlang.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TranslationHistoryRepository historyRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está registrado");
        }
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
        String token = tokenProvider.generateToken(user.getEmail());
        return LoginResponse.builder().token(token).email(user.getEmail()).build();
    }

    @Transactional
    public void deleteByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        historyRepository.deleteByUser(user);
        userRepository.delete(user);
    }

    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");
        }
        String token = tokenProvider.generateToken(request.getEmail());
        return LoginResponse.builder().token(token).email(request.getEmail()).build();
    }
}
