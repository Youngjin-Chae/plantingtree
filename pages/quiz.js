import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/style.css';

function QuizPage() {
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0); // 초기 값을 나중에 로컬 스토리지에서 가져온 값으로 설정할 것입니다.
  const router = useRouter();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = () => {
    fetch('https://opentdb.com/api.php?amount=1&type=multiple')
      .then(response => response.json())
      .then(data => {
        setQuestionData(data.results[0]);
        setUserAnswer('');
      });
  };

  const checkAnswer = (event) => {
    event.preventDefault();
    if (questionData && userAnswer.toLowerCase() === questionData.correct_answer.toLowerCase()) {
      setScore(prevScore => prevScore + 5);
      alert('Correct!');
    } else {
      alert(`Incorrect. The correct answer is: ${questionData.correct_answer}`);
    }
    fetchQuestion();
  };

  const exitQuiz = () => {
    localStorage.setItem('quizScore', score);
    router.push('/menu');
  };

  const decodeHtml = (html) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (!questionData) return <div>Loading...</div>;

  return (
    <div className="quizBackground">
        <div className="quiz-container">
            <h2 id="question-title">Question</h2>
            <form id="quiz-form" onSubmit={checkAnswer}>
                <label htmlFor="answer" id="question-label">{decodeHtml(questionData.question)}</label>
                <input 
                    type="text" 
                    name="answer" 
                    id="answer" 
                    value={userAnswer} 
                    onChange={(e) => setUserAnswer(e.target.value)} 
                />
                <button type="submit">Submit</button>
            </form>
            <div id="score">Score: {score}</div>
            <div>Answer (For Testing): {decodeHtml(questionData.correct_answer)}</div>
            <button onClick={exitQuiz}>Exit Quiz</button>
        </div>
    </div>
);
}

export default QuizPage;