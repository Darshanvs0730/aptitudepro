package com.example.aptitudepractice.controller;

import com.example.aptitudepractice.model.*;
import com.example.aptitudepractice.payload.request.AttemptRequest;
import com.example.aptitudepractice.repository.OptionRepository;
import com.example.aptitudepractice.repository.QuestionRepository;
import com.example.aptitudepractice.repository.UserRepository;
import com.example.aptitudepractice.service.AttemptHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List; // Import List

@RestController
@RequestMapping("/api")
public class AttemptHistoryController {

    @Autowired
    private AttemptHistoryService attemptHistoryService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private OptionRepository optionRepository;


    @PostMapping("/attempts")
    public ResponseEntity<?> saveAttempt(@Valid @RequestBody AttemptRequest attemptRequest) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        Question question = questionRepository.findById(attemptRequest.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Error: Question not found."));
                
        Option selectedOption = optionRepository.findById(attemptRequest.getSelectedOptionId())
                .orElseThrow(() -> new RuntimeException("Error: Option not found."));

        AttemptHistory attemptHistory = new AttemptHistory();
        attemptHistory.setUser(user);
        attemptHistory.setQuestion(question);
        attemptHistory.setSelectedOption(selectedOption);
        attemptHistory.setWasCorrect(attemptRequest.getWasCorrect());
        attemptHistory.setAttemptedAt(LocalDateTime.now());
        
        attemptHistoryService.saveAttempt(attemptHistory);

        return ResponseEntity.ok("Attempt saved successfully!");
    }

    // NEW --- Method to get attempts for the logged-in user
    @GetMapping("/attempts")
    public ResponseEntity<List<AttemptHistory>> getUserAttempts() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        List<AttemptHistory> attempts = attemptHistoryService.getAttemptsByUserId(user.getId());
        return ResponseEntity.ok(attempts);
    }
}

