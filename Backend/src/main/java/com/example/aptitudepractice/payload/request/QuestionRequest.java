package com.example.aptitudepractice.payload.request;

import com.example.aptitudepractice.model.DifficultyLevel;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.List;

@Data
public class QuestionRequest {
    @NotBlank
    private String questionText;

    @NotNull
    private Long categoryId;

    @NotNull
    private DifficultyLevel difficulty;

    @NotBlank
    private String explanationText;

    @NotNull
    @Size(min = 4, max = 4)
    private List<OptionRequest> options;
}