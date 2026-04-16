import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong py-2 sm:py-3' : 'py-3 sm:py-5'}`}>
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <a href="#" className="text-lg sm:text-xl font-bold gradient-text relative group">
          {'<SS />'}
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
        </a>

        <div className="hidden md:flex gap-1">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm px-3 py-1.5 rounded-md transition-all duration-200 ${
                activeSection === l.href.slice(1)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground p-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-strong mt-2 mx-3 sm:mx-4 rounded-lg p-3 sm:p-4 space-y-1 animate-fade-in-up">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md transition-all">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
