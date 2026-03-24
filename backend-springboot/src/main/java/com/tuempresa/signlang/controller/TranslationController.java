package com.tuempresa.signlang.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/translate")
@CrossOrigin(origins = "*")
public class TranslationController {
    @PostMapping
    public String translate() {
        return "Hola Mock";
    }
}
