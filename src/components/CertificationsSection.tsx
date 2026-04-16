import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const certifications = [
  { name: 'Certified Tester Foundation Level v4.0 — ISTQB', rarity: 'LEGENDARY', color: 'border-yellow-500/40 hover:border-yellow-400/60' },
  { name: 'Software Test Automation Engineer — Xinsof Technologies', rarity: 'EPIC', color: 'border-purple-500/40 hover:border-purple-400/60' },
  { name: 'API Testing with Postman — 10 Pearls University', rarity: 'RARE', color: 'border-blue-400/40 hover:border-blue-300/60' },
  { name: 'QA Fundamentals — 10 Pearls University', rarity: 'RARE', color: 'border-blue-400/40 hover:border-blue-300/60' },
  { name: 'API Testing and Basic Overview of JMeter', rarity: 'UNCOMMON', color: 'border-green-400/40 hover:border-green-300/60' },
  { name: 'Building an AI First Mindset — LinkedIn Learning', rarity: 'UNCOMMON', color: 'border-green-400/40 hover:border-green-300/60' },
];

export default function CertificationsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="certifications" className="section-padding relative">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading title="Certifications" subtitle="Achievement unlocked — professional credentials." />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className={`glass rounded-xl p-4 sm:p-5 flex items-start gap-3 transition-all duration-500 group hover:-translate-y-1 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] border ${cert.color} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mt-0.5 flex-shrink-0">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-primary/10 flex items-center justify-center text-[10px] sm:text-xs">🏆</div>
              </div>
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold text-primary/80 tracking-wider">{cert.rarity}</span>
                <p className="text-xs sm:text-sm text-secondary-foreground mt-0.5">{cert.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
