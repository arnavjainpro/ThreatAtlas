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

const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, maxScore, type, subtitle, onClick }) => {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = (score: number, maxScore: number, type: string) => {
    const ratio = score / maxScore;
    if (type === 'total') {
      if (ratio >= 0.8) return '#dc2626'; // red
      if (ratio >= 0.6) return '#ea580c'; // orange
      if (ratio >= 0.4) return '#facc15'; // yellow
      if (ratio >= 0.2) return '#16a34a'; // green
      return '#059669'; // emerald
    } else {
      if (ratio >= 0.8) return '#dc2626';
      if (ratio >= 0.6) return '#ea580c';
      if (ratio >= 0.4) return '#facc15';
      return '#16a34a';
    }
  };

  const scoreColor = getScoreColor(score, maxScore, type);

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
          <span className="score-card__max">/{maxScore}</span>
        </div>
        
        <div className="score-card__progress">
          <div 
            className="score-card__progress-bar" 
            style={{ 
              width: `${percentage}%`,
              backgroundColor: scoreColor 
            }}
          />
        </div>
        
        <div className="score-card__percentage">
          {percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
