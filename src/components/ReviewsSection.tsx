import React, { useState } from 'react';
import { navigate } from '../state/router';

interface Review {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const REVIEWS: Review[] = [
  {
    quote: 'We worked with a few agencies before, but Noora just got it. The brand finally feels aligned, sharper and way more us.',
    author: 'Frankie Brooks',
    role: 'Co-founder at Peni',
    avatar: '/proto/review-frankie.jpg',
  },
  {
    quote: 'NST did not just design a logo for us; they uncovered the emotional core of our business and built a brand world around it.',
    author: 'Elena Rostova',
    role: 'Creative Director at Arpeggio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote: 'Their Story First philosophy brought genuine conviction to our launch film. The response was overwhelming.',
    author: 'Devendra Kulkarni',
    role: 'Head of Product at Urban Velocity',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  },
  {
    quote: 'Working with Nikunj Storytelling Studio felt like collaborating with master craftsmen. Meaning that makes brands remembered.',
    author: 'Aarav Mehta',
    role: 'Founder at Lyniq Labs',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80',
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

export const ReviewsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const review = REVIEWS[index];
  const step = (dir: number) => setIndex((i) => (i + dir + REVIEWS.length) % REVIEWS.length);

  return (
    <section className="reviews" aria-label="Client reviews">
      <span className="cross cross--r1" aria-hidden="true" />
      <h2 className="reviews__title" data-reveal>
        Our work speaks loudest through{' '}
        <br />
        <span className="muted">
          the results it creates. But here’s{' '}
          <br />
          what our clients say about the{' '}
          <br />
          experience.
        </span>
      </h2>

      <div className="reviews__grid">
        <div className="rating-card" data-reveal>
          <span className="cross cross--c1" aria-hidden="true" />
          <span className="cross cross--c2" aria-hidden="true" />
          <span className="cross cross--c3" aria-hidden="true" />
          <span className="cross cross--c4" aria-hidden="true" />
          <p className="rating-card__score">4.78/5</p>
          <p className="rating-card__label">Average rating<br />from our clients</p>
          <img className="rating-card__avatars" src="/proto/review-avatars.png" alt="Client avatars" width="792" height="240" loading="lazy" />
          <p className="rating-card__trusted">Trusted by 30+ teams</p>
          <button className="pill-btn" onClick={() => navigate('home', 'contact-section')}>Leave a review</button>
        </div>

        <div className="quote" data-reveal style={{ transitionDelay: '450ms' }}>
          <p className="quote__count">{pad(index + 1)} / {pad(REVIEWS.length)}</p>
          <blockquote key={index} className="quote__text">"{review.quote}"</blockquote>
          <div className="quote__author">
            <img src={review.avatar} alt="" width="89" height="89" loading="lazy" />
            <div>
              <p className="quote__name">{review.author}</p>
              <p className="quote__role">{review.role}</p>
            </div>
          </div>
          <div className="quote__nav">
            <button className="round-btn round-btn--light" onClick={() => step(-1)} aria-label="Previous review">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6" /></svg>
            </button>
            <button className="round-btn" onClick={() => step(1)} aria-label="Next review">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>
            </button>
            <span className="quote__progress">
              <span style={{ width: `${((index + 1) / REVIEWS.length) * 100}%` }} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
