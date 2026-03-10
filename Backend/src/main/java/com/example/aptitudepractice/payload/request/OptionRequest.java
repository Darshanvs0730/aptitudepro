package com.example.aptitudepractice.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OptionRequest {
    @NotBlank
    private String optionText;

    @NotNull
    private Boolean isCorrect;
}