package com.example.aptitudepractice.service;

import com.example.aptitudepractice.model.*;
import com.example.aptitudepractice.payload.request.QuestionRequest;
import com.example.aptitudepractice.repository.AttemptHistoryRepository;
import com.example.aptitudepractice.repository.CategoryRepository;
import com.example.aptitudepractice.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AttemptHistoryRepository attemptHistoryRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getRandomQuestions(Long userId, int limit) {
        List<Question> availableQuestions = questionRepository.findQuestionsNotAttemptedByUser(userId);
        
        // If user has attempted all questions, return all questions (shuffled)
        if (availableQuestions.isEmpty()) {
            availableQuestions = questionRepository.findAll();
        }
        
        // Shuffle the list
        Collections.shuffle(availableQuestions);
        
        // Return only the requested number of questions
        return availableQuestions.stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Transactional
    public Question addQuestion(QuestionRequest questionRequest) {
        Category category = categoryRepository.findById(questionRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Error: Category not found."));

        Question question = new Question();
        question.setQuestionText(questionRequest.getQuestionText());
        question.setCategory(category);
        question.setDifficulty(questionRequest.getDifficulty());

        List<Option> options = questionRequest.getOptions().stream().map(optReq -> {
            Option option = new Option();
            option.setOptionText(optReq.getOptionText());
            option.setCorrect(optReq.getIsCorrect());
            option.setQuestion(question);
            return option;
        }).collect(Collectors.toList());
        question.setOptions(options);

        Explanation explanation = new Explanation();
        explanation.setExplanationText(questionRequest.getExplanationText());
        explanation.setQuestion(question);
        question.setExplanation(explanation);
        
        return questionRepository.save(question);
    }
    
    @Transactional
    public void deleteQuestion(Long questionId) {
        // Step 1: Delete all historical attempts for this question
        attemptHistoryRepository.deleteByQuestionId(questionId);
        
        // Step 2: Now it's safe to delete the question itself
        questionRepository.deleteById(questionId);
    }
}

