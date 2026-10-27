import React from 'react';
import { navigate } from '../state/router';
import { POSTS, type Block } from '../data/blog';

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

const renderBlock = (block: Block, i: number) => {
  switch (block.type) {
    case 'epigraph':
      return (
        <figure key={i} className="article__epigraph" data-reveal>
          <blockquote>{block.text}</blockquote>
          <figcaption>— {block.cite}</figcaption>
        </figure>
      );
    case 'pull':
      return (
        <p key={i} className="article__pull" data-reveal>
          {block.text}
        </p>
      );
    case 'question':
      return (
        <p key={i} className="article__question" data-reveal>
          {block.text}
        </p>
      );
    default:
      return (
        <p key={i} className="article__p" data-reveal>
          {block.text}
        </p>
      );
  }
};

/** A single blog article, set in the site's editorial style. */
export const PostPage: React.FC = () => {
  const post = POSTS[0];

  return (
    <main className="page page--post">
      <div className="page__band" />
      <article className="article">
        <header className="article__head">
          <button className="article__back" onClick={() => navigate('blog')}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 12H4m6-6-6 6 6 6" />
            </svg>
            Blog
          </button>
          <p className="article__meta" data-reveal>
            <time dateTime={post.dateISO}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>NST Studio</span>
          </p>
          <h1 className="article__title" data-reveal>
            {post.title}
            <span className="red-dot">.</span>
          </h1>
          <a className="linkedin-link" href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" data-reveal>
            View on LinkedIn
            <ArrowUpRight />
          </a>
        </header>

        <div className="article__cover" data-reveal>
          <img src={post.cover} alt={`${post.title} — cover`} width="1114" height="627" decoding="async" />
        </div>

        <div className="article__body">{post.body.map(renderBlock)}</div>

        <footer className="article__foot">
          <ul className="article__tags" aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
          <div className="article__cta" data-reveal>
            <p>Tell us yours — join the conversation on LinkedIn, or begin your own story with us.</p>
            <div className="article__cta-actions">
              <a className="story-btn" href={post.linkedinUrl} target="_blank" rel="noopener noreferrer">
                View on LinkedIn
                <ArrowUpRight />
              </a>
              <button className="linkedin-link linkedin-link--light" onClick={() => navigate('home', 'contact-section')}>
                Begin your Story
              </button>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
};
