import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function TreePlantingGame() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('quizScore');
    return savedScore ? parseInt(savedScore, 0) : 10;
  });

  const [trees, setTrees] = useState(() => {
    const savedTrees = localStorage.getItem('trees');
    return savedTrees ? JSON.parse(savedTrees) : [];
  });

  const [isPlantingMode, setIsPlantingMode] = useState(false);
  const [isRemovingMode, setIsRemovingMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('quizScore', score);
    localStorage.setItem('trees', JSON.stringify(trees));
  }, [score, trees]);

  const handlePlantMode = () => {
    setIsRemovingMode(false);
    setIsPlantingMode(!isPlantingMode);
  };

  const handleRemoveMode = () => {
    setIsPlantingMode(false);
    setIsRemovingMode(!isRemovingMode);
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

    if (isRemovingMode) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find the tree near the click position (within a threshold)
      const threshold = 20; // Adjust this as needed
      const treeToRemove = trees.find(tree => Math.abs(tree.x - x) < threshold && Math.abs(tree.y - y) < threshold);

      if (treeToRemove) {
        setTrees(prevTrees => prevTrees.filter(tree => tree !== treeToRemove));
        setIsRemovingMode(false);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <h1>Planting Tree Game</h1>
      <p>Seeds: {score}</p>
      <button onClick={handlePlantMode}>Plant a tree (Cost: 1)</button>
      <button onClick={handleRemoveMode}>Remove a tree</button>
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
