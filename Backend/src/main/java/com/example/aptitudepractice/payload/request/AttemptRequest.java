package com.example.aptitudepractice.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AttemptRequest {
    @NotNull
    private Long questionId;

    @NotNull
    private Long selectedOptionId;

    @NotNull
    private Boolean wasCorrect;
}
