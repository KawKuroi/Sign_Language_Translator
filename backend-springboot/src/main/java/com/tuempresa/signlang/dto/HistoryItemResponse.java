package com.tuempresa.signlang.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class HistoryItemResponse {
    private Long id;
    private String text;
    private LocalDateTime savedAt;
}
