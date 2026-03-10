DELETE FROM attempt_history WHERE question_id IN (14, 15, 16, 25, 27, 29, 33, 37, 38, 45);
DELETE FROM options WHERE question_id IN (14, 15, 16, 25, 27, 29, 33, 37, 38, 45);
DELETE FROM explanations WHERE question_id IN (14, 15, 16, 25, 27, 29, 33, 37, 38, 45);
DELETE FROM questions WHERE id IN (14, 15, 16, 25, 27, 29, 33, 37, 38, 45);
