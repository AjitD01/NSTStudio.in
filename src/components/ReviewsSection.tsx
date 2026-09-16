import React, { useState } from 'react';

interface ReviewItem {
  id: string;
  num: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: '1',
    num: '01 / 04',
    quote:
      'We worked with a few agencies before, but Noora just got it. The brand finally feels aligned, sharper and way more us.',
    author: 'Frankie Brooks',
    role: 'Co-founder at Mero',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: '2',
    num: '02 / 04',
    quote:
      'NST did not just design a logo for us; they uncovered the emotional core of our business and built an acoustic brand world around it.',
    author: 'Elena Rostova',
    role: 'Creative Director at Arpeggio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: '3',
    num: '03 / 04',
    quote:
      'Their Story First philosophy brought genuine conviction to our launch film. Traffic surged by 240% and investor praise was overwhelming.',
    author: 'Devendra Kulkarni',
    role: 'Head of Product at Urban Velocity',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
  },
  {
    id: '4',
    num: '04 / 04',
    quote:
      'Working with Nikunj Storytelling Studio felt like collaborating with master craftsmen. Truly meaning that makes brands remembered.',
    author: 'Aarav Mehta',
    role: 'Founder at Lyniq Labs',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80',
  },
];

export const ReviewsSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const currentReview = REVIEWS_DATA[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="prototype-reviews-section">
      <div className="section-container">
        {/* Prototype Monumental Dual-Line Heading */}
        <div className="section-header-block">
          <h2 className="reviews-prototype-headline">
            Our work speaks loudest through
            <br />
            the results it creates. But here's what our clients say about the experience.
          </h2>
        </div>

        {/* Prototype 2-Card Split Layout */}
        <div className="reviews-split-grid">
          {/* Left Rating Card (4.78/5) from Prototype */}
          <div className="reviews-rating-card">
            <div className="rating-score-highlight">
              <span className="rating-score-num">4.78</span>
              <span className="rating-score-denom">/5</span>
            </div>

            <div className="rating-description-label">
              Average rating from our clients
            </div>

            {/* Overlapping Client Avatars Row */}
            <div className="rating-avatars-cluster">
              {REVIEWS_DATA.map((r, i) => (
                <img
                  key={r.id}
                  src={r.avatar}
                  alt={r.author}
                  className="cluster-avatar"
                  style={{ zIndex: 10 - i }}
                />
              ))}
              <div className="cluster-more-badge">+120</div>
            </div>

            {/* Prototype: "Leave a review" button */}
            <button className="leave-review-pill-btn">
              Leave a review
            </button>

            <div className="card-annotation-tag left">SIMILAR style ←</div>
          </div>

          {/* Right Active Testimonial Card from Prototype */}
          <div className="reviews-quote-card">
            <div className="quote-card-top-row">
              <span className="quote-step-counter">{currentReview.num}</span>
              <span className="verified-partnership-tag">VERIFIED COMMISSION</span>
            </div>

            <p className="quote-main-statement">
              “{currentReview.quote}”
            </p>

            <div className="quote-author-footer">
              <div className="author-details-group">
                <img
                  src={currentReview.avatar}
                  alt={currentReview.author}
                  className="author-detail-avatar"
                />
                <div>
                  <div className="author-detail-name">{currentReview.author}</div>
                  <div className="author-detail-role">{currentReview.role}</div>
                </div>
              </div>

              {/* Prototype: Navigation Buttons < > ("button for review") */}
              <div className="quote-navigation-controls">
                <button
                  className="quote-nav-btn prev"
                  onClick={handlePrev}
                  aria-label="Previous review"
                  title="Previous Review"
                >
                  ←
                </button>
                <button
                  className="quote-nav-btn next"
                  onClick={handleNext}
                  aria-label="Next review"
                  title="Next Review"
                >
                  →
                </button>
              </div>
            </div>

            <div className="card-annotation-tag right">button for review →</div>
          </div>
        </div>
      </div>
    </section>
  );
};
