package com.tuempresa.signlang.service;

import com.tuempresa.signlang.dto.HistoryItemResponse;
import com.tuempresa.signlang.entity.TranslationHistory;
import com.tuempresa.signlang.entity.User;
import com.tuempresa.signlang.repository.TranslationHistoryRepository;
import com.tuempresa.signlang.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TranslationHistoryServiceTest {

    @Mock private TranslationHistoryRepository historyRepository;
    @Mock private UserRepository userRepository;
    @InjectMocks private TranslationHistoryService historyService;

    private User buildUser() {
        return User.builder().id(1L).email("user@test.com").passwordHash("hash").build();
    }

    @Test
    void save_authenticatedUser_persistsText() {
        User user = buildUser();
        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(user));
        when(historyRepository.save(any(TranslationHistory.class))).thenAnswer(inv -> {
            TranslationHistory h = inv.getArgument(0);
            h.setId(1L);
            h.setSavedAt(LocalDateTime.now());
            return h;
        });

        HistoryItemResponse result = historyService.save("user@test.com", "HELLO");

        assertThat(result.getText()).isEqualTo("HELLO");
        assertThat(result.getId()).isEqualTo(1L);
    }

    @Test
    void getHistory_returnsOrderedList() {
        User user = buildUser();
        TranslationHistory h1 = TranslationHistory.builder().id(1L).user(user).text("HI").savedAt(LocalDateTime.now()).build();
        TranslationHistory h2 = TranslationHistory.builder().id(2L).user(user).text("WORLD").savedAt(LocalDateTime.now().minusMinutes(1)).build();

        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(user));
        when(historyRepository.findByUserOrderBySavedAtDesc(user)).thenReturn(List.of(h1, h2));

        List<HistoryItemResponse> result = historyService.getHistory("user@test.com");

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getText()).isEqualTo("HI");
    }

    @Test
    void getHistory_unknownEmail_throwsNotFound() {
        when(userRepository.findByEmail("unknown@test.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> historyService.getHistory("unknown@test.com"))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(e -> assertThat(((ResponseStatusException) e).getStatusCode())
                        .isEqualTo(HttpStatus.NOT_FOUND));
    }
}
