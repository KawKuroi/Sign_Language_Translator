package com.tuempresa.signlang.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AiServiceClientTest {

    @Mock private RestTemplate restTemplate;
    @InjectMocks private AiServiceClient aiServiceClient;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(aiServiceClient, "aiServiceUrl", "http://localhost:8000");
    }

    @Test
    void predict_successResponse_returnsMap() {
        Map<String, Object> aiResponse = Map.of(
                "hand_found", true,
                "letter", "A",
                "confidence", 0.97
        );
        when(restTemplate.postForEntity(anyString(), any(), eq(Map.class)))
                .thenReturn(ResponseEntity.ok(aiResponse));

        Map<String, Object> result = aiServiceClient.predict("data:image/jpeg;base64,abc");

        assertThat(result).containsEntry("letter", "A");
        assertThat(result).containsEntry("hand_found", true);
    }

    @Test
    void predict_aiServiceDown_throwsException() {
        when(restTemplate.postForEntity(anyString(), any(), eq(Map.class)))
                .thenThrow(new ResourceAccessException("Connection refused"));

        assertThatThrownBy(() -> aiServiceClient.predict("data:image/jpeg;base64,abc"))
                .isInstanceOf(ResourceAccessException.class);
    }
}
