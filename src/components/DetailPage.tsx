import React from 'react';
import './DetailPage.css';

interface ScoreBreakdownItem {
  factor: string;
  impact: number;
  maxImpact: number;
  description: string;
  recommendations?: string[];
}

interface DetailPageProps {
  title: string;
  subtitle: string;
  icon: string;
  totalScore: number;
  maxScore: number;
  scoreBreakdown: ScoreBreakdownItem[];
  additionalInfo?: React.ReactNode;
  exportButton?: React.ReactNode;
}

const DetailPage: React.FC<DetailPageProps> = ({
  title,
  subtitle,
  icon,
  totalScore,
  maxScore,
  scoreBreakdown,
  additionalInfo,
  exportButton
}) => {
  const getScoreColor = () => {
    // Always return black - no color coding based on score
    return '#000000';
  };

  const getSeverityLabel = () => {
    // No severity labels - just return empty string
    return '';
  };

  return (
    <div className="detail-page">
      <div className="detail-page__header">
        <div className="detail-page__title-section">
          <span className="detail-page__icon">{icon}</span>
          <div>
            <h1 className="detail-page__title">{title}</h1>
            <p className="detail-page__subtitle">{subtitle}</p>
          </div>
        </div>
        
        <div className="detail-page__actions">
          {exportButton && (
            <div className="detail-page__export">
              {exportButton}
            </div>
          )}
          <div className="detail-page__score-summary">
            <div className="score-summary">
              <div className="score-summary__value">
                <span 
                  className="score-summary__number"
                  style={{ color: getScoreColor() }}
                >
                  {totalScore.toFixed(1)}
                </span>
                <span className="score-summary__max">/{maxScore}</span>
              </div>
              <div className="score-summary__progress">
                <div 
                  className="score-summary__progress-bar"
                  style={{ 
                    width: `${(totalScore / maxScore) * 100}%`,
                    backgroundColor: getScoreColor()
                  }}
                />
              </div>
              <span 
                className="score-summary__severity"
                style={{ color: getScoreColor() }}
              >
                {getSeverityLabel()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-page__content">
        <div className="score-breakdown">
          <h2 className="score-breakdown__title">Score Breakdown</h2>
          <div className="score-breakdown__list">
            {scoreBreakdown.map((item, index) => (
              <div key={index} className="breakdown-item">
                <div className="breakdown-item__header">
                  <div className="breakdown-item__info">
                    <h3 className="breakdown-item__factor">{item.factor}</h3>
                    <p className="breakdown-item__description">{item.description}</p>
                  </div>
                  <div className="breakdown-item__score">
                    <span 
                      className="breakdown-item__impact"
                      style={{ color: getScoreColor() }}
                    >
                      {item.impact.toFixed(1)}
                    </span>
                    <span className="breakdown-item__max">/{item.maxImpact}</span>
                  </div>
                </div>
                
                <div className="breakdown-item__progress">
                  <div 
                    className="breakdown-item__progress-bar"
                    style={{ 
                      width: `${(item.impact / item.maxImpact) * 100}%`,
                      backgroundColor: getScoreColor()
                    }}
                  />
                </div>
                
                {item.recommendations && item.recommendations.length > 0 && (
                  <div className="breakdown-item__recommendations">
                    <h4 className="recommendations__title">Recommendations:</h4>
                    <ul className="recommendations__list">
                      {item.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="recommendations__item">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {additionalInfo && (
          <div className="detail-page__additional">
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
