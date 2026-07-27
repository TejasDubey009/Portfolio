import React from 'react';
import { achievementSection } from '../portfolio';
import { Award, ExternalLink } from 'lucide-react';

export const Achievements = () => {
  if (!achievementSection.display) {
    return null;
  }

  return (
    <section className="main" id="achievements">
      <div className="achievement-main-div">
        <div className="achievement-header">
          <h1 className="heading achievement-heading">{achievementSection.title}</h1>
          <p className="subTitle achievement-subtitle">{achievementSection.subtitle}</p>
        </div>

        <div className="achievement-cards-div">
          {achievementSection.achievementsCards.map((card, i) => {
            return (
              <div key={i} className="certificate-card">
                <div className="certificate-image-div">
                  <img
                    className="certificate-image"
                    src={card.image}
                    alt={card.imageAlt || card.title}
                    onError={(e) => {
                      e.target.src = 'https://img.icons8.com/color/96/000000/award.png';
                    }}
                  />
                </div>
                <div className="certificate-detail-div">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-subtitle">{card.subtitle}</p>
                </div>
                {card.footer && (
                  <div className="certificate-card-footer">
                    {card.footer.map((v, index) => {
                      return (
                        <a
                          key={index}
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="certificate-btn"
                        >
                          {v.name}
                          <ExternalLink size={14} style={{ marginLeft: '6px' }} />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
