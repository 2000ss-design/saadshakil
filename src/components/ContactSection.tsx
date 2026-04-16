import { useState } from 'react';
import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const contactLinks = [
  {
    label: 'Email',
    icon: '📧',
    value: 'saadshakil2000@gmail.com',
    href: 'mailto:saadshakil2000@gmail.com',
    color: 'hover:border-red-400/50 hover:shadow-[0_0_25px_rgba(248,113,113,0.15)]',
  },
  {
    label: 'Phone',
    icon: '📞',
    value: '+92 316 114 1034',
    href: 'tel:+923161141034',
    color: 'hover:border-green-400/50 hover:shadow-[0_0_25px_rgba(74,222,128,0.15)]',
  },
  {
    label: 'GitHub',
    icon: '🐙',
    value: 'github.com/2000ss-design',
    href: 'https://github.com/2000ss-design',
    color: 'hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(192,132,252,0.15)]',
  },
  {
    label: 'LinkedIn',
    icon: '💼',
    value: 'linkedin.com/in/saad-shakil2000',
    href: 'https://linkedin.com/in/saad-shakil2000',
    color: 'hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(96,165,250,0.15)]',
  },
];

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('saadshakil2000@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-20 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10 px-4 sm:px-6">
        <SectionHeading title="Contact" subtitle="Ready to connect? Let's make it happen." />

        <div ref={ref} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`glass rounded-xl p-4 sm:p-5 border border-border/50 transition-all duration-500 group block hover:-translate-y-2 relative ${link.color} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`text-xl sm:text-2xl transition-transform duration-300 ${hoveredIdx === i ? 'scale-125 rotate-12' : ''}`}>
                    {link.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] sm:text-xs font-mono text-primary tracking-wider uppercase">{link.label}</div>
                    <div className="text-xs sm:text-sm text-foreground mt-0.5 group-hover:text-primary transition-colors truncate">{link.value}</div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 right-0 w-px h-4 bg-primary/60" />
                  <div className="absolute top-0 right-0 h-px w-4 bg-primary/60" />
                </div>
              </a>
            ))}
          </div>

          <div className={`glass rounded-2xl p-6 sm:p-8 glow-border text-center space-y-4 sm:space-y-5 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '500ms' }}>
            <p className="text-sm sm:text-base text-muted-foreground">
              Whether you have a project in mind, want to collaborate, or just want to say hello — feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:saadshakil2000@gmail.com"
                className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm sm:text-base hover:opacity-90 transition-all hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5"
              >
                🚀 Say Hello
              </a>
              <button
                onClick={copyEmail}
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg glass glow-border text-foreground font-medium text-sm sm:text-base hover:border-primary/50 transition-all hover:-translate-y-0.5"
              >
                {copied ? '✅ Copied!' : '📋 Copy Email'}
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono">📍 Karachi, Pakistan · Available for remote work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
