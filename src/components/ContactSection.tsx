import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useInView';
import { LandText } from './LandText';
import { openWhatsApp } from '../data/contact';
// Storyteller poses cycled beside the heading ("Character pose animation").
const POSES = ['/nst/character/ch1.png', '/nst/character/ch2.png', '/nst/character/ch3.png', '/nst/character/ch4.png'];

export const ContactSection: React.FC = () => {
  const [pose, setPose] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', about: '' });

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => setPose((p) => (p + 1) % POSES.length), 1600);
    return () => clearInterval(id);
  }, []);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // "ON YOU" sends the filled form to the studio's WhatsApp as a pre-written message.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      'Begin your Story.',
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Whatsapp: ${form.whatsapp.trim()}`,
      'Tell about you:',
      form.about.trim(),
    ].join('\n');
    openWhatsApp(message);
  };

  return (
    <section id="contact-section" className="contact">
      <div className="contact__head">
        <h2 className="heading-xl contact__title land-heading" data-reveal>
          <LandText text="Begin your Story" />
          <span className="red-dot land__dot">.</span>
        </h2>
        <div className="contact__pose" aria-hidden="true">
          {POSES.map((src, i) => (
            <img key={src} src={src} alt="" className={i === pose ? 'is-active' : ''} />
          ))}
        </div>
      </div>

      <form className="contact__card" onSubmit={handleSubmit} data-reveal>
        <div className="contact__row">
          <label className="field">
            <span>Name:</span>
            <input type="text" name="name" autoComplete="name" maxLength={120} required value={form.name} onChange={update('name')} />
          </label>
          <label className="field">
            <span>Email:</span>
            <input type="email" name="email" autoComplete="email" maxLength={160} required value={form.email} onChange={update('email')} />
          </label>
        </div>
        <div className="contact__row">
          <label className="field">
            <span>Whatsapp:</span>
            <input type="tel" name="whatsapp" autoComplete="tel" maxLength={20} pattern="[0-9+\(\)\s\-]{6,20}" value={form.whatsapp} onChange={update('whatsapp')} />
          </label>
        </div>
        <label className="field field--area">
          <span>tell about you</span>
          <textarea name="about" rows={3} maxLength={2000} required value={form.about} onChange={update('about')} />
        </label>
        <button type="submit" className="contact__submit">ON YOU</button>
      </form>
    </section>
  );
};
