package com.tuempresa.signlang.repository;

import com.tuempresa.signlang.entity.TranslationHistory;
import com.tuempresa.signlang.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TranslationHistoryRepository extends JpaRepository<TranslationHistory, Long> {
    List<TranslationHistory> findByUserOrderBySavedAtDesc(User user);
    void deleteByUser(User user);
}
