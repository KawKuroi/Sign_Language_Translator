package com.tuempresa.signlang.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class TranslationResponse {
    private boolean handFound;
    private String letter;
    private Double confidence;
    private List<Map<String, Object>> top;
}
