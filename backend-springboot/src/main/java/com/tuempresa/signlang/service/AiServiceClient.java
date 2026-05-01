package com.tuempresa.signlang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
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

    public Map<String, Object> predict(String imageDataUrl) {
        String url = aiServiceUrl + "/predict";
        Map<String, String> body = Map.of("image", imageDataUrl);
        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url, HttpMethod.POST, new HttpEntity<>(body),
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );
        return response.getBody();
    }
}
