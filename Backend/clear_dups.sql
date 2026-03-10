DELETE FROM attempt_history WHERE question_id NOT IN (SELECT MIN(id) FROM questions GROUP BY question_text);
DELETE FROM options WHERE question_id NOT IN (SELECT MIN(id) FROM questions GROUP BY question_text);
DELETE FROM explanations WHERE question_id NOT IN (SELECT MIN(id) FROM questions GROUP BY question_text);
DELETE FROM questions WHERE id NOT IN (SELECT MIN(id) FROM questions GROUP BY question_text);
