import React from 'react';
import { talksSection, podcastSection } from '../portfolio';
import { Mic, Presentation, ExternalLink } from 'lucide-react';

export const Talks = () => {
  const showTalks = talksSection && talksSection.display;
  const showPodcast = podcastSection && podcastSection.display;

  if (!showTalks && !showPodcast) {
    return null;
  }

  return (
    <section className="main" id="talks">
      {showTalks && (
        <div className="talks-container">
          <h1 className="talks-heading">{talksSection.title}</h1>
          <p className="subTitle talks-subtitle">{talksSection.subtitle}</p>

          <div className="talks-cards-div">
            {talksSection.talks.map((talk, index) => (
              <div key={index} className="talk-card">
                <div className="talk-icon-div">
                  <Presentation size={32} />
                </div>
                <div className="talk-detail-div">
                  <h3 className="talk-title">{talk.title}</h3>
                  <p className="talk-subtitle">{talk.subtitle}</p>
                  <div className="talk-links">
                    {talk.slides_url && (
                      <a href={talk.slides_url} target="_blank" rel="noopener noreferrer" className="talk-btn">
                        Slides <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                      </a>
                    )}
                    {talk.event_url && (
                      <a href={talk.event_url} target="_blank" rel="noopener noreferrer" className="talk-btn">
                        Event <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPodcast && (
        <div className="podcast-container">
          <h1 className="talks-heading">{podcastSection.title}</h1>
          <p className="subTitle talks-subtitle">{podcastSection.subtitle}</p>
          <div className="podcast-main-div">
            {podcastSection.podcast.map((podcastUrl, i) => (
              <div key={i} className="podcast-card">
                <Mic size={28} className="podcast-icon" />
                <a href={podcastUrl} target="_blank" rel="noopener noreferrer" className="podcast-link">
                  Listen to Podcast Episode {i + 1}
                  <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
