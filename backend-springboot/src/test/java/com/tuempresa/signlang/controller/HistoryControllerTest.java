package com.tuempresa.signlang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tuempresa.signlang.dto.HistoryItemResponse;
import com.tuempresa.signlang.dto.SaveHistoryRequest;
import com.tuempresa.signlang.config.SecurityConfig;
import com.tuempresa.signlang.security.JwtAuthenticationFilter;
import com.tuempresa.signlang.security.JwtTokenProvider;
import com.tuempresa.signlang.service.TranslationHistoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HistoryController.class)
@Import({JwtAuthenticationFilter.class, SecurityConfig.class})
class HistoryControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @MockBean private TranslationHistoryService historyService;
    @MockBean private UserDetailsService userDetailsService;
    @MockBean private JwtTokenProvider tokenProvider;

    @Test
    @WithMockUser(username = "user@test.com")
    void saveHistory_authenticated_returns201() throws Exception {
        SaveHistoryRequest req = new SaveHistoryRequest();
        req.setText("HELLO");

        HistoryItemResponse resp = HistoryItemResponse.builder()
                .id(1L).text("HELLO").savedAt(LocalDateTime.now()).build();
        when(historyService.save(anyString(), anyString())).thenReturn(resp);

        mockMvc.perform(post("/history")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.text").value("HELLO"));
    }

    @Test
    void saveHistory_unauthenticated_returns401() throws Exception {
        SaveHistoryRequest req = new SaveHistoryRequest();
        req.setText("HELLO");

        mockMvc.perform(post("/history")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user@test.com")
    void getHistory_authenticated_returnsList() throws Exception {
        HistoryItemResponse item = HistoryItemResponse.builder()
                .id(1L).text("WORLD").savedAt(LocalDateTime.now()).build();
        when(historyService.getHistory(anyString())).thenReturn(List.of(item));

        mockMvc.perform(get("/history"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].text").value("WORLD"));
    }

    @Test
    void getHistory_unauthenticated_returns401() throws Exception {
        mockMvc.perform(get("/history"))
                .andExpect(status().isUnauthorized());
    }
}
