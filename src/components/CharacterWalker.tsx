import React from 'react';
import { navigate } from '../state/router';

/**
 * "Walking animation with text": the storyteller walks in from the right edge of the
 * page and crosses to the left, with "Got a Project in Mind ?" following behind, on repeat.
 */
export const CharacterWalker: React.FC = () => (
  <section className="walker" aria-label="Got a Project in Mind?">
    <button className="walker__run" onClick={() => navigate('home', 'contact-section')}>
      <span className="sr-only">Got a Project in Mind? Begin your story</span>
      <span className="walker__group" aria-hidden="true">
        <span className="walker__figure">
          <img src="/proto/walker.svg" alt="" width="170" height="304" />
        </span>
        <span className="walker__phrase">
          Got a Project in Mind <span className="walker__q">?</span>
        </span>
      </span>
    </button>
  </section>
);
