package com.tuempresa.signlang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tuempresa.signlang.dto.TranslationRequest;
import com.tuempresa.signlang.security.JwtAuthenticationFilter;
import com.tuempresa.signlang.service.AiServiceClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TranslationController.class)
@Import(JwtAuthenticationFilter.class)
class TranslationControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @MockBean private AiServiceClient aiServiceClient;
    @MockBean private UserDetailsService userDetailsService;
    @MockBean private com.tuempresa.signlang.security.JwtTokenProvider tokenProvider;

    @Test
    void healthCheck_returns200() throws Exception {
        mockMvc.perform(get("/translate"))
                .andExpect(status().isOk());
    }

    @Test
    void translate_withoutAuth_returns200() throws Exception {
        Map<String, Object> aiResult = Map.of(
                "hand_found", true,
                "letter", "A",
                "confidence", 0.97,
                "top", List.of()
        );
        when(aiServiceClient.predict(anyString())).thenReturn(aiResult);

        TranslationRequest req = new TranslationRequest();
        req.setImage("data:image/jpeg;base64,abc123");

        mockMvc.perform(post("/translate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.letter").value("A"))
                .andExpect(jsonPath("$.handFound").value(true));
    }

    @Test
    void translate_aiServiceUnavailable_returns500() throws Exception {
        when(aiServiceClient.predict(anyString()))
                .thenThrow(new ResourceAccessException("Connection refused"));

        TranslationRequest req = new TranslationRequest();
        req.setImage("data:image/jpeg;base64,abc123");

        mockMvc.perform(post("/translate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().is5xxServerError());
    }
}
