package com.example.aptitudepractice.controller;

import com.example.aptitudepractice.model.User;
import com.example.aptitudepractice.repository.UserRepository;
import com.example.aptitudepractice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class ForgotPasswordController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Error: User with this email not found."));

            // Generate Token
            String token = UUID.randomUUID().toString();
            user.setResetPasswordToken(token);
            user.setResetPasswordTokenExpiry(LocalDateTime.now().plusMinutes(15)); // 15 min expiry
            userRepository.save(user);

            // Send Email
            String resetLink = "http://localhost:3000/reset-password?token=" + token;
            String message = "Hello,\n\n" +
                    "You have requested to reset your password.\n" +
                    "Click the link below to change your password:\n\n" +
                    resetLink + "\n\n" +
                    "Ignore this email if you do remember your password, \n" +
                    "or you have not made the request.";

            emailService.sendEmail(email, "Password Reset Request", message);
            return ResponseEntity.ok(
                    Map.of("message", "We have sent a reset password link to your email. Please check your inbox."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error sending email. Please check SMTP configuration."));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> processResetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        User user = userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new RuntimeException("Error: Invalid Token!"));

        if (user.getResetPasswordTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Error: Token has expired. Please request a new one."));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "You have successfully changed your password."));
    }
}
