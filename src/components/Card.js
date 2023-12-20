import React from 'react';
import backImage from '../images/back.png';

const Card = ({ image, isFlipped, onClick }) => {
  const handleClick = () => {
    if (!isFlipped) {
      onClick();
    }
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-content">
        <img src={isFlipped ? image : backImage} alt="Card" />
      </div>
    </div>
  );
};

export default Card;
