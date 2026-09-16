import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="contact-section" className="prototype-contact-section">
      <div className="section-container">
        {/* Prototype Header with Red Dot & Character Pose */}
        <div className="contact-header-layout">
          <div className="contact-header-text">
            <div className="section-tag-kicker">INITIATE COMMISSION</div>
            <h2 className="section-title-large">
              Begin your Story<span className="text-red-accent">.</span>
            </h2>
            <p className="section-intro-text">
              Every enduring narrative begins with a question. Tell us about your brand,
              timeline, and aspirations.
            </p>
          </div>

          {/* Prototype: Character Pose Animation */}
          <div className="contact-character-pose-box">
            <div className="pose-image-wrapper">
              <img
                src="/nst/character/ch4_light.png"
                alt="NST Character Celebratory Pose"
                className="pose-character-img"
              />
              <div className="pose-glow" />
            </div>
            <div className="pose-annotation-label">
              <span>Character pose animation</span>
              <span className="label-arrow">→</span>
            </div>
          </div>
        </div>

        {/* Prototype: Transparent / Glassmorphic Card Container */}
        <div className="contact-transparent-card">
          <div className="card-annotation-tag">Transparent</div>

          {isSubmitted ? (
            <div className="contact-success-state">
              <div className="success-badge">✓</div>
              <h3 className="success-heading">Story Initiated with Honor</h3>
              <p className="success-message">
                Thank you, <strong>{name}</strong>. The NST creative directors will review your details
                and connect via <strong>{whatsapp || email}</strong> within 24 business hours.
              </p>
              <button
                className="success-reset-button"
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="prototype-contact-form">
              {/* Row 1: Name & Email */}
              <div className="form-fields-row">
                <div className="field-underline-item">
                  <label htmlFor="input-name" className="field-label-prototype">
                    Name:
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    className="field-input-underline"
                    placeholder="e.g. Anand Mahindra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="field-underline-item">
                  <label htmlFor="input-email" className="field-label-prototype">
                    Email:
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    className="field-input-underline"
                    placeholder="e.g. anand@maison.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Row 2: Whatsapp / Phone */}
              <div className="form-fields-row">
                <div className="field-underline-item full-width">
                  <label htmlFor="input-whatsapp" className="field-label-prototype">
                    Whatsapp:
                  </label>
                  <input
                    id="input-whatsapp"
                    type="tel"
                    className="field-input-underline"
                    placeholder="+91 98765 43210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: tell about you (Rounded box from Prototype) */}
              <div className="field-textarea-group">
                <label htmlFor="input-about" className="field-label-prototype">
                  tell about you:
                </label>
                <textarea
                  id="input-about"
                  rows={4}
                  className="field-input-rounded-box"
                  placeholder="What is the story behind your idea? What feeling should people carry with them?"
                  value={aboutYou}
                  onChange={(e) => setAboutYou(e.target.value)}
                  required
                />
              </div>

              {/* Prototype: Bottom Action Row with 'ON YOU' Button */}
              <div className="form-bottom-actions">
                <div className="direct-reachout-info">
                  <span className="direct-mail">✉ nststudio.in@gmail.com</span>
                  <span className="direct-dot">·</span>
                  <span className="direct-phone">📞 +91 8651178652</span>
                  <span className="direct-dot">·</span>
                  <span className="direct-loc">📍 Pune & Mumbai</span>
                </div>

                {/* Prototype Button: 'ON YOU' */}
                <button type="submit" className="prototype-on-you-btn">
                  <span>ON YOU</span>
                  <span className="btn-arrow-right">→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
