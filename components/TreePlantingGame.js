import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function TreePlantingGame() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('quizScore');
    return savedScore ? parseInt(savedScore, 0) : 10;
  });
  
  const [trees, setTrees] = useState([]);
  const [isPlantingMode, setIsPlantingMode] = useState(false);

  useEffect(() => {
    // 점수 상태가 변경될 때마다 localStorage에 업데이트
    localStorage.setItem('quizScore', score);
  }, [score]);

  const handlePlantMode = () => {
    if (score >= 1) {
      setIsPlantingMode(true);
    }
  };

  const plantTree = (e) => {
    if (isPlantingMode) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setTrees([...trees, { x, y, age: 0 }]);
      setScore(prevScore => prevScore - 1);
      setIsPlantingMode(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // 가로 중앙 정렬
      justifyContent: 'center', // 세로 중앙 정렬
      height: '100vh' // 높이를 뷰포트의 100%로 설정
  }}>
      <h1>Planting Tree Game</h1>
      <p>Seeds: {score}</p>
      <button onClick={handlePlantMode}>Plant a tree (Cost: 1)</button>
      <div className="forest" onClick={plantTree}>
        {trees.map((tree, index) => (
          <div key={index} className={`tree age-${tree.age}`} style={{ left: `${tree.x}px`, top: `${tree.y}px` }} ></div>
        ))}
      </div>
      <Link href="/menu" passHref>
        <button>Exit</button>
      </Link>
    </div>
  );
}

export default TreePlantingGame;
