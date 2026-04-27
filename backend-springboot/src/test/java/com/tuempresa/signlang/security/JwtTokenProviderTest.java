package com.tuempresa.signlang.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(tokenProvider, "jwtSecret", "clave-secreta-de-prueba-minimo-32-chars!!");
        ReflectionTestUtils.setField(tokenProvider, "jwtExpirationMs", 86400000L);
    }

    @Test
    void generateToken_returnsNonNullToken() {
        String token = tokenProvider.generateToken("test@test.com");
        assertThat(token).isNotNull().isNotBlank();
    }

    @Test
    void getEmailFromToken_returnsCorrectEmail() {
        String email = "user@example.com";
        String token = tokenProvider.generateToken(email);
        assertThat(tokenProvider.getEmailFromToken(token)).isEqualTo(email);
    }

    @Test
    void validateToken_validToken_returnsTrue() {
        String token = tokenProvider.generateToken("user@example.com");
        assertThat(tokenProvider.validateToken(token)).isTrue();
    }

    @Test
    void validateToken_tamperedToken_returnsFalse() {
        String token = tokenProvider.generateToken("user@example.com") + "tampered";
        assertThat(tokenProvider.validateToken(token)).isFalse();
    }

    @Test
    void validateToken_expiredToken_returnsFalse() {
        ReflectionTestUtils.setField(tokenProvider, "jwtExpirationMs", 1L);
        String token = tokenProvider.generateToken("user@example.com");
        try { Thread.sleep(10); } catch (InterruptedException ignored) {}
        assertThat(tokenProvider.validateToken(token)).isFalse();
    }
}
