package com.example.aptitudepractice.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryStat {
    private String categoryName;
    private Long totalAttempts;
    private Long correctAttempts;
}
