package com.example.aptitudepractice;

import com.example.aptitudepractice.model.*;
import com.example.aptitudepractice.repository.CategoryRepository;
import com.example.aptitudepractice.repository.QuestionRepository;
import com.example.aptitudepractice.repository.RoleRepository;
import com.example.aptitudepractice.repository.UserRepository; // Import UserRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.Set; // Import Set

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    UserRepository userRepository; // Autowire UserRepository

    @Autowired
    PasswordEncoder encoder; // Autowire PasswordEncoder

    @Override
    public void run(String... args) throws Exception {
        // Initialize Roles if they don't exist
        if (roleRepository.count() == 0) {
            Role userRole = new Role();
            userRole.setName(ERole.ROLE_USER);
            roleRepository.save(userRole);

            Role adminRole = new Role();
            adminRole.setName(ERole.ROLE_ADMIN);
            roleRepository.save(adminRole);
            System.out.println("Initialized USER and ADMIN roles in the database.");
        }

        // --- NEW --- Create a default Admin User if one doesn't exist
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User("admin", "admin@aptitudepro.com", encoder.encode("adminpass"));
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Admin Role is not found."));
            adminUser.setRoles(Set.of(adminRole));
            userRepository.save(adminUser);
            System.out.println("Created default admin user.");
        }


        // Initialize Categories and Questions if they don't exist
        if (categoryRepository.count() == 0) {
            System.out.println("Database is empty. Seeding sample questions...");

            // Create Categories
            Category quant = new Category();
            quant.setName("Quantitative Aptitude");
            categoryRepository.save(quant);

            Category logical = new Category();
            logical.setName("Logical Reasoning");
            categoryRepository.save(logical);

            Category verbal = new Category();
            verbal.setName("Verbal Ability");
            categoryRepository.save(verbal);

            // --- Questions ---
            createQuestion("If a train travels at 60 km/h, how far will it travel in 45 minutes?", quant, DifficultyLevel.EASY,
                    "30 km", "45 km", "50 km", "60 km", 2,
                    "Speed is 60 km/h, which is 1 km per minute (60 km / 60 min). In 45 minutes, the train will travel 45 * 1 = 45 km.");

            createQuestion("Which number should come next in the series: 2, 6, 12, 20, 30, ?", logical, DifficultyLevel.MEDIUM,
                    "36", "42", "48", "56", 2,
                    "The pattern is n * (n+1). 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30. The next term is 6*7=42.");

            createQuestion("Choose the word that is most nearly the opposite in meaning to the word 'Venerate'.", verbal, DifficultyLevel.HARD,
                    "Respect", "Despise", "Admire", "Cherish", 2,
                    "To 'venerate' means to regard with great respect. The opposite is to 'despise', which means to feel contempt for something.");
            
            createQuestion("A man buys a cycle for $1400 and sells it at a loss of 15%. What is the selling price?", quant, DifficultyLevel.EASY,
                    "$1190", "$1200", "$1160", "$1000", 1,
                    "Loss = 15% of $1400 = $210. Selling Price = Cost Price - Loss = $1400 - $210 = $1190.");

            createQuestion("The sum of ages of 5 children born at intervals of 3 years each is 50 years. What is the age of the youngest child?", quant, DifficultyLevel.MEDIUM,
                    "4 years", "8 years", "10 years", "None of these", 1,
                    "Let ages be x, x+3, x+6, x+9, x+12. Sum is 5x + 30 = 50. So, 5x = 20, which means x = 4.");
            
            createQuestion("Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?", logical, DifficultyLevel.EASY,
                    "7", "10", "12", "13", 2,
                    "This is an alternating series. One series is 7, 8, 9... and the second is 10, 11, 12... The next number is from the second series, which is 10.");
            
            createQuestion("A is B's sister. C is B's mother. D is C's father. How is A related to D?", logical, DifficultyLevel.HARD,
                    "Granddaughter", "Grandfather", "Daughter", "Aunt", 1,
                    "A is the sister of B, so C is also the mother of A. D is the father of C. Therefore, D is the maternal grandfather of A, making A his granddaughter.");

            createQuestion("What is the synonym for 'Ephemeral'?", verbal, DifficultyLevel.EASY,
                    "Eternal", "Transient", "Beautiful", "Strong", 2,
                    "'Ephemeral' means lasting for a very short time. 'Transient' also means lasting for a short time.");

            createQuestion("Select the correctly spelled word.", verbal, DifficultyLevel.MEDIUM,
                    "Embarass", "Embarrass", " embaras", "embarasment", 2,
                    "The correct spelling is 'Embarrass', with two 'r's and two 's's.");

            System.out.println("Finished seeding sample questions.");
        }
    }

    private void createQuestion(String questionText, Category category, DifficultyLevel difficulty,
                                String opt1, String opt2, String opt3, String opt4, int correctOption,
                                String explanationText) {
        Question q = new Question();
        q.setQuestionText(questionText);
        q.setCategory(category);
        q.setDifficulty(difficulty);

        Option o1 = new Option(); o1.setOptionText(opt1); o1.setCorrect(correctOption == 1); o1.setQuestion(q);
        Option o2 = new Option(); o2.setOptionText(opt2); o2.setCorrect(correctOption == 2); o2.setQuestion(q);
        Option o3 = new Option(); o3.setOptionText(opt3); o3.setCorrect(correctOption == 3); o3.setQuestion(q);
        Option o4 = new Option(); o4.setOptionText(opt4); o4.setCorrect(correctOption == 4); o4.setQuestion(q);
        q.setOptions(Arrays.asList(o1, o2, o3, o4));

        Explanation e = new Explanation();
        e.setExplanationText(explanationText);
        e.setQuestion(q);
        q.setExplanation(e);
        questionRepository.save(q);
    }
}