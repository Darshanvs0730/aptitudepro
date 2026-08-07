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

    @org.springframework.data.jpa.repository.Query("SELECT new com.example.aptitudepractice.payload.response.LeaderboardEntry(u.username, COUNT(a.id)) " +
           "FROM AttemptHistory a JOIN a.user u " +
           "WHERE a.wasCorrect = true " +
           "GROUP BY u.id, u.username " +
           "ORDER BY COUNT(a.id) DESC")
    List<com.example.aptitudepractice.payload.response.LeaderboardEntry> getLeaderboard(org.springframework.data.domain.Pageable pageable);
    @org.springframework.data.jpa.repository.Query("SELECT new com.example.aptitudepractice.payload.response.CategoryStat(c.name, COUNT(a.id), SUM(CASE WHEN a.wasCorrect = true THEN 1 ELSE 0 END)) " +
           "FROM AttemptHistory a JOIN a.question q JOIN q.category c " +
           "WHERE a.user.id = :userId " +
           "GROUP BY c.id, c.name")
    List<com.example.aptitudepractice.payload.response.CategoryStat> getCategoryStats(@org.springframework.data.repository.query.Param("userId") Long userId);
}

