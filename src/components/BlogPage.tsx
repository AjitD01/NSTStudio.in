import React from 'react';
import { LandText } from './LandText';

const POSTS = [
  { title: 'How to build a visual identity that stands out', date: 'Mar 20, 2025', image: '/proto/blog-1.jpg' },
  { title: 'How to stay relevant in a fast-changing digital world', date: 'Mar 13, 2025', image: '/proto/blog-2.jpg' },
];

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
      <div className="blog__grid">
        {POSTS.map((post, i) => (
          <article key={post.title} className="blog-card" data-reveal style={{ transitionDelay: `${350 + i * 120}ms` }}>
            <div className="blog-card__media">
              <img src={post.image} alt="" decoding="async" />
            </div>
            <h2 className="blog-card__title">{post.title}</h2>
            <time className="blog-card__date">{post.date}</time>
          </article>
        ))}
      </div>
    </section>
  </main>
);
