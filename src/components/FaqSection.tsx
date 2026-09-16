import React, { useState } from 'react';
import { scrollManager } from '../state/scrollStore';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS_DATA: FaqItem[] = [
  {
    id: '1',
    question: 'How long does a project take?',
    answer:
      'A comprehensive brand identity engagement typically spans 4 to 6 weeks. This includes immersion, narrative strategy, logomark exploration, color and typography hierarchy, 3D asset generation, and compiling the master brand guideline dossier.',
  },
  {
    id: '2',
    question: 'Can I update the site myself?',
    answer:
      'Yes, absolutely. We architect our digital platforms with intuitive content management capabilities, clean component schemas, and comprehensive documentation so your internal team can make continuous updates with confidence.',
  },
  {
    id: '3',
    question: 'Do I need to have a brand before starting?',
    answer:
      'Not at all. In fact, many of our most successful partnerships begin with just an idea or a question: "What is the story?" We build the entire brand from the ground up, uncovering its reason for existing.',
  },
  {
    id: '4',
    question: 'What is the Pro Plan membership model?',
    answer:
      'Our Pro Plan is a dedicated monthly subscription providing unlimited creative direction across branding, web design, and motion with priority turnaround and no surprise invoices.',
  },
  {
    id: '5',
    question: 'Do you collaborate with international clients outside of India?',
    answer:
      'Yes! Over 60% of our commissions originate from North America, Europe, the Middle East, and Southeast Asia. We maintain asynchronous Miro and Figma review loops tailored to your local timezone.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['1']);

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <section id="faq-section" className="prototype-faq-section">
      <div className="section-container">
        <div className="faq-layout-split">
          {/* Left Column: FAQ Heading & "Your query not here?" Card from Prototype */}
          <div className="faq-left-column">
            <h2 className="faq-prototype-heading">FAQ</h2>

            <div className="faq-query-card">
              <p className="query-card-text">Your query not here ?</p>
              <button
                className="query-ask-btn"
                onClick={() => scrollManager.scrollToSection('contact-section')}
              >
                <span>Ask your</span>
                <span className="btn-arrow-icon">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: "Before you start..." + Accordion Rows from Prototype */}
          <div className="faq-right-column">
            <h3 className="faq-subhead-text">
              Before you start, here are some of the <strong>things most clients want to know.</strong>
            </h3>

            <div className="faq-accordion-container">
              {FAQS_DATA.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`prototype-faq-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      className="faq-question-row-btn"
                      onClick={() => toggleFaq(item.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-title">{item.question}</span>
                      <span className="faq-circle-toggle">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="faq-answer-collapse">
                        <p className="faq-answer-paragraph">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
