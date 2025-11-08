import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { to: '/', label: 'Home', emoji: '💌' },
  { to: '/wishes', label: 'Wishes', emoji: '🎁' },
  { to: '/messages', label: 'Notes', emoji: '📝' },
  { to: '/milestones', label: 'Milestones', emoji: '⏳' },
  { to: '/reasons', label: 'Reasons', emoji: '✨' },
  { to: '/likes', label: 'Her Tastes', emoji: '🍽️' },
  { to: '/zalia', label: 'Gallery', emoji: '🌸' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="glass-panel rounded-3xl px-5 py-3 shadow-lg backdrop-blur-xl border border-white/30 bg-white/60 dark:bg-white/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-text/70">Zalia & Me</p>
            <p className="handwritten text-xl text-text">Forever Playlist</p>
          </div>
          <button
            type="button"
            className="md:hidden relative w-9 h-9 rounded-2xl bg-white/60 text-text flex items-center justify-center shadow-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <span
              className={clsx(
                'block h-0.5 w-5 rounded-full bg-text transition-all duration-300',
                isOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'
              )}
            />
            <span
              className={clsx(
                'absolute block h-0.5 w-5 rounded-full bg-text transition-opacity duration-300',
                isOpen ? 'opacity-0' : 'opacity-100'
              )}
            />
            <span
              className={clsx(
                'block h-0.5 w-5 rounded-full bg-text transition-all duration-300',
                isOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'
              )}
            />
          </button>
        </div>
        <nav
          className={clsx(
            'mt-2 flex flex-col gap-2 overflow-hidden transition-all duration-500 md:mt-4 md:flex-row md:flex-wrap md:gap-3',
            isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 md:max-h-full md:opacity-100 md:translate-y-0'
          )}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300',
                  'bg-white/40 text-text shadow-sm hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-lg',
                  isActive && 'bg-gradient-to-r from-primary/80 to-secondary/70 text-white shadow-primary/40'
                )
              }
            >
              <span aria-hidden="true">{item.emoji}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
