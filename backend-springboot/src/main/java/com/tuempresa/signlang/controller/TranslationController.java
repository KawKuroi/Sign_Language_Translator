package com.tuempresa.signlang.controller;

import com.tuempresa.signlang.dto.TranslationRequest;
import com.tuempresa.signlang.dto.TranslationResponse;
import com.tuempresa.signlang.service.AiServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/translate")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TranslationController {

    private final AiServiceClient aiServiceClient;

    @GetMapping
    public ResponseEntity<Void> health() {
        return ResponseEntity.ok().build();
    }

    @PostMapping
    @SuppressWarnings("unchecked")
    public ResponseEntity<TranslationResponse> translate(@RequestBody TranslationRequest request) {
        Map<String, Object> aiResult = aiServiceClient.predict(request.getImage());

        boolean handFound = (Boolean) aiResult.getOrDefault("hand_found", false);
        String letter     = (String)  aiResult.get("letter");
        Double confidence = ((Number) aiResult.getOrDefault("confidence", 0.0)).doubleValue();
        List<Map<String, Object>> top = (List<Map<String, Object>>) aiResult.getOrDefault("top", List.of());

        TranslationResponse response = TranslationResponse.builder()
                .handFound(handFound)
                .letter(letter)
                .confidence(confidence)
                .top(top)
                .build();

        return ResponseEntity.ok(response);
    }
}
