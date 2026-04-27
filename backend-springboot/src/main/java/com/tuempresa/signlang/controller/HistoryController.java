package com.tuempresa.signlang.controller;

import com.tuempresa.signlang.dto.HistoryItemResponse;
import com.tuempresa.signlang.dto.SaveHistoryRequest;
import com.tuempresa.signlang.service.TranslationHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/history")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class HistoryController {

    private final TranslationHistoryService historyService;

    @PostMapping
    public ResponseEntity<HistoryItemResponse> save(@RequestBody SaveHistoryRequest request,
                                                    Authentication authentication) {
        String email = authentication.getName();
        HistoryItemResponse saved = historyService.save(email, request.getText());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<HistoryItemResponse>> getHistory(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(historyService.getHistory(email));
    }
}
