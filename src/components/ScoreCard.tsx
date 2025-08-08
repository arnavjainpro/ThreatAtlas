import React from 'react';
import './ScoreCard.css';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  type: 'base' | 'actionable' | 'total';
  subtitle?: string;
  onClick?: () => void;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, type, subtitle, onClick }) => {
  const getScoreColor = () => {
    // Always return black - no color coding based on score
    return '#000000';
  };

  const scoreColor = getScoreColor();

  return (
    <div 
      className={`score-card score-card--${type} ${onClick ? 'score-card--clickable' : ''}`}
      onClick={onClick}
    >
      <div className="score-card__header">
        <h3 className="score-card__title">{title}</h3>
        {subtitle && <p className="score-card__subtitle">{subtitle}</p>}
      </div>
      
      <div className="score-card__score">
        <div className="score-card__value">
          <span className="score-card__number" style={{ color: scoreColor }}>
            {score.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
