package com.example.aptitudepractice.repository;

import com.example.aptitudepractice.model.AttemptHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface AttemptHistoryRepository extends JpaRepository<AttemptHistory, Long> {
    List<AttemptHistory> findByUserId(Long userId);

    // NEW --- Method to delete all attempts for a given question
    @Transactional
    void deleteByQuestionId(Long questionId);
}

