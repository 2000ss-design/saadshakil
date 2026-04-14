import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

const certifications = [
  'Certified Tester Foundation Level v4.0 — ISTQB',
  'Software Test Automation Engineer — Xinsof Technologies',
  'API Testing with Postman — 10 Pearls University',
  'QA Fundamentals — 10 Pearls University',
  'API Testing and Basic Overview of JMeter',
  'Building an AI First Mindset — LinkedIn Learning',
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <SectionHeading title="Certifications" subtitle="Professional credentials and continuous learning." />
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <ScrollReveal key={i} delay={i * 0.08} direction="scale">
              <div className="glass rounded-xl p-5 glow-border flex items-start gap-3 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300">
                <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0 shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                <span className="text-sm text-secondary-foreground">{cert}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
