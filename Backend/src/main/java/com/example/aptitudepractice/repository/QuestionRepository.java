package com.example.aptitudepractice.repository;

import com.example.aptitudepractice.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    @Query("SELECT DISTINCT q FROM Question q " +
           "LEFT JOIN AttemptHistory a ON q.id = a.question.id AND a.user.id = :userId " +
           "WHERE a.id IS NULL")
    List<Question> findQuestionsNotAttemptedByUser(@Param("userId") Long userId);
}