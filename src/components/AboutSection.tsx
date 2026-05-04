import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  { label: 'Years Experience', value: '4+' },
  { label: 'Fintech Projects', value: '15+' },
  { label: 'Certifications', value: '6' },
  { label: 'Tools Mastered', value: '12+' },
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading title="About Me" subtitle="Ensuring software quality, one test at a time." />

        <div ref={ref} className={`glass rounded-2xl p-6 sm:p-8 md:p-12 glow-border space-y-5 sm:space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm sm:text-base text-secondary-foreground leading-relaxed">
            I'm Saad Shakil — an <span className="text-primary font-semibold">ISTQB-certified, fintech-focused SQA Engineer</span> with
            4+ years of experience in automation and performance testing. I specialize in API validation,
            ATM transaction flows, and instant payment systems like <span className="text-accent font-semibold">Raast</span>.
          </p>
          <p className="text-sm sm:text-base text-secondary-foreground leading-relaxed">
            I build robust automation frameworks using <span className="text-primary font-semibold">Playwright</span> and <span className="text-primary font-semibold">Cypress</span>,
            and optimize system performance with <span className="text-primary font-semibold">JMeter</span> and simulators like <span className="text-primary font-semibold">PaySim</span> and <span className="text-primary font-semibold">FimSIM</span>.
            Based in Karachi, Pakistan, I hold a Bachelor's in Computer Science from Dawood University of Engineering & Technology and
            thrive on delivering reliable, high-performance fintech software.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center p-3 sm:p-4 rounded-lg bg-muted/50 border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 100 + 300}ms` }}>
                <div className="text-xl sm:text-2xl font-bold text-primary font-mono">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
