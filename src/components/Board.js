import React, { useState, useEffect } from 'react';
import Card from './Card';

const Board = ({ images }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [comboScore, setComboScore] = useState(0);
  const [boardSize, setBoardSize] = useState({ rows: 4, columns: 4 });

  useEffect(() => {
    const selectedImages = images.slice(0, boardSize.rows * boardSize.columns / 2);
    const duplicatedImages = [...selectedImages, ...selectedImages];
    const shuffledImages = shuffleArray(duplicatedImages);
    setCards(shuffledImages);
  }, [images, boardSize]);

  useEffect(() => {
    let timer;
    if (isGameStarted && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsGameStarted(false);
    }
    return () => clearTimeout(timer);
  }, [isGameStarted, remainingTime]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray; 
  }

  const handleCardClick = (cardIndex) => {
    if (matchedCards.includes(cardIndex) || flippedCards.includes(cardIndex)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [card1, card2] = newFlippedCards;

      if (cards[card1] === cards[card2]) {
        const newMatchedCards = [...matchedCards, card1, card2];
        setMatchedCards(newMatchedCards);

        if ((newMatchedCards.length + 2) % 2 === 0) {
          const newComboScore = comboScore + 1;
          setComboScore(newComboScore);
          setScore((prevScore) => prevScore + 1)
        }

        if (newMatchedCards.length === cards.length) {
          setIsGameStarted(false);
        }
      } else {
        setTimeout(() => {
          const flippedWithoutMismatch = flippedCards.filter((card) => !newFlippedCards.includes(card));
          setFlippedCards(flippedWithoutMismatch);
          setScore((prevScore) => Math.max(prevScore - 1, 0));
          setComboScore(0);
        }, 1000);
      }
    } else if (newFlippedCards.length > 2) {
      setFlippedCards([cardIndex]);
    }
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
    setRemainingTime(60);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setComboScore(0);

    const shuffledCards = shuffleArray(cards);
    setCards(shuffledCards);

    setTimeout(() => {
      setFlippedCards(Array.from({ length: cards.length }, (_, index) => index));
    }, 0);

    setTimeout(() => {
      setFlippedCards([]);
    }, 1000);
  };

  return (
    <div className="board">
      <div className="game-controls">
        <button
          className={`start-button ${isGameStarted ? 'disabled' : ''}`}
          onClick={handleStartGame}
          disabled={isGameStarted}
        >
          {remainingTime === 0 ? '게임 시작' : '게임 시작'}
        </button>
      </div>
      <div className="game-container">
        <div className="game-board">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card}
              isFlipped={flippedCards.includes(index) || matchedCards.includes(index) || !isGameStarted}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        <div className="score-board">
          <div className="score-label">Score :</div>
          <div className="score-value">{score}</div>

        </div>
        <div className="timer">{remainingTime}초</div>
      </div>
    </div>
  );
};

export default Board;
