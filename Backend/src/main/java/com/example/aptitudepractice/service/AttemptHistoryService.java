package com.example.aptitudepractice.service;

import com.example.aptitudepractice.model.AttemptHistory;
import com.example.aptitudepractice.repository.AttemptHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttemptHistoryService {

    @Autowired
    private AttemptHistoryRepository attemptHistoryRepository;

    public AttemptHistory saveAttempt(AttemptHistory attemptHistory) {
        return attemptHistoryRepository.save(attemptHistory);
    }

    public List<AttemptHistory> getAttemptsByUserId(Long userId) {
        return attemptHistoryRepository.findByUserId(userId);
    }
}
