import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/style.css';

function MenuPage() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('quizScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 0));
    }
  }, []);

  return (
    <div className="menu-container">
      <h2>Select a Menu</h2>
      <Link href="/quiz">
        <button className="menu-btn">Quiz</button>
      </Link>
      <Link href="/game">
        <button className="menu-btn">Tree Planting Map</button>
      </Link>
      <div className="score-display">Your Current Score: {score}</div>
    </div>
  );
}

export default MenuPage;
