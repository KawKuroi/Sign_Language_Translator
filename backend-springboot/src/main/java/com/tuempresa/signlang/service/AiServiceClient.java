package com.tuempresa.signlang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiServiceClient {

    private final RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    @SuppressWarnings("unchecked")
    public Map<String, Object> predict(String imageDataUrl) {
        String url = aiServiceUrl + "/predict";
        Map<String, String> body = Map.of("image", imageDataUrl);
        ResponseEntity<Map> response = restTemplate.postForEntity(url, body, Map.class);
        return response.getBody();
    }
}
