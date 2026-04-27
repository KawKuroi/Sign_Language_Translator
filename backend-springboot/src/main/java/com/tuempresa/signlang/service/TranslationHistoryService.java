package com.tuempresa.signlang.service;

import com.tuempresa.signlang.dto.HistoryItemResponse;
import com.tuempresa.signlang.entity.TranslationHistory;
import com.tuempresa.signlang.entity.User;
import com.tuempresa.signlang.repository.TranslationHistoryRepository;
import com.tuempresa.signlang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TranslationHistoryService {

    private final TranslationHistoryRepository historyRepository;
    private final UserRepository userRepository;

    public HistoryItemResponse save(String email, String text) {
        User user = findUser(email);
        TranslationHistory entry = TranslationHistory.builder()
                .user(user)
                .text(text)
                .build();
        TranslationHistory saved = historyRepository.save(entry);
        return toResponse(saved);
    }

    public List<HistoryItemResponse> getHistory(String email) {
        User user = findUser(email);
        return historyRepository.findByUserOrderBySavedAtDesc(user)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private User findUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    private HistoryItemResponse toResponse(TranslationHistory entry) {
        return HistoryItemResponse.builder()
                .id(entry.getId())
                .text(entry.getText())
                .savedAt(entry.getSavedAt())
                .build();
    }
}
