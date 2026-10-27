import React from 'react';
import { LandText } from './LandText';
import { navigate } from '../state/router';
import { POSTS } from '../data/blog';

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </svg>
);

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const BlogPage: React.FC = () => (
  <main className="page page--blog">
    <div className="page__band" />
    <section className="blog">
      <div className="blog__head">
        <h1 className="blog__title land-heading" data-reveal>
          <LandText text="Blog." />
        </h1>
        <p className="blog__intro" data-reveal style={{ transitionDelay: '350ms' }}>
          Our blog delivers actionable tips to help
          <br />
          you build a powerful, timeless brand.
        </p>
      </div>

      <div className="blog__list">
        {POSTS.map((post, i) => (
          <article
            key={post.slug}
            className="post-card"
            data-reveal
            style={{ transitionDelay: `${350 + i * 120}ms` }}
          >
            <button className="post-card__media" onClick={() => navigate('post')} aria-label={`Read ${post.title}`}>
              <img src={post.cover} alt="" decoding="async" />
            </button>
            <div className="post-card__body">
              <p className="post-card__meta">
                <time dateTime={post.dateISO}>{post.date}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </p>
              <h2 className="post-card__title">
                <button onClick={() => navigate('post')}>{post.title}</button>
              </h2>
              <p className="post-card__excerpt">{post.excerpt}</p>
              <div className="post-card__actions">
                <button className="story-btn" onClick={() => navigate('post')}>
                  Read the story
                  <ArrowRight />
                </button>
                <a className="linkedin-link" href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  View on LinkedIn
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);
