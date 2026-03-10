package com.example.aptitudepractice.controller;

import com.example.aptitudepractice.model.Question;
import com.example.aptitudepractice.model.User;
import com.example.aptitudepractice.payload.request.QuestionRequest; // Import QuestionRequest
import com.example.aptitudepractice.repository.UserRepository;
import com.example.aptitudepractice.service.QuestionService;
import jakarta.validation.Valid; // Import Valid
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Import ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/questions")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/questions/random")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Question>> getRandomQuestions(
            @RequestParam(defaultValue = "10") int limit) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found."));
        
        List<Question> questions = questionService.getRandomQuestions(user.getId(), limit);
        return ResponseEntity.ok(questions);
    }

    // NEW --- Add a new question (Admin only)
    @PostMapping("/questions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Question> addQuestion(@Valid @RequestBody QuestionRequest questionRequest) {
        Question newQuestion = questionService.addQuestion(questionRequest);
        return ResponseEntity.ok(newQuestion);
    }

    // NEW --- Delete a question (Admin only)
    @DeleteMapping("/questions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted successfully!");
    }
}