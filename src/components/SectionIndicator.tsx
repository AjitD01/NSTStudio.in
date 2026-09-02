import React from 'react';

/**
 * SectionIndicator — Cartier-style vertical dot navigation.
 * Synchronized with Drei's real-time scroll offset.
 */

interface SectionIndicatorProps {
  scrollOffset: number;
  onSelectSection: (index: number) => void;
}

const SECTIONS = [
  { id: 'prologue', label: 'Prologue' },
  { id: 'universes', label: 'Four Universes' },
  { id: 'thread', label: 'The Sacred Thread' },
  { id: 'atelier', label: 'Craft Atelier' },
  { id: 'gallery', label: 'Selected Works' },
  { id: 'archive', label: 'Living Archive' },
  { id: 'commission', label: 'Private Commission' },
  { id: 'maison', label: 'Maison' },
];

export const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  scrollOffset,
  onSelectSection,
}) => {
  // 0 to 1 mapped to 0..7
  const activeIndex = Math.min(
    Math.round(scrollOffset * (SECTIONS.length - 1)),
    SECTIONS.length - 1
  );

  return (
    <div
      style={{
        position: 'fixed',
        right: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '18px',
        pointerEvents: 'auto',
      }}
    >
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={section.id}
            className="section-dot-item"
            data-index={i}
            onClick={() => onSelectSection(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            {/* Hover/Active Label */}
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontFamily: "'Courier Prime', monospace",
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                transition: 'all 0.3s ease',
                userSelect: 'none',
                opacity: isActive ? 1 : 0.35,
              }}
            >
              {section.label}
            </span>

            {/* Dot Indicator */}
            <div
              style={{
                width: isActive ? '10px' : '6px',
                height: isActive ? '10px' : '6px',
                borderRadius: '50%',
                background: isActive ? '#c8102e' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: isActive ? '0 0 10px #c8102e' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
