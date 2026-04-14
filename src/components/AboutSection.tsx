import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const stats = [
  { label: 'Years Experience', value: '3.5+' },
  { label: 'Projects Delivered', value: '15+' },
  { label: 'Certifications', value: '6' },
  { label: 'Tools Mastered', value: '12+' },
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="About Me" subtitle="Ensuring software quality, one test at a time." />

        <div ref={ref} className={`glass rounded-2xl p-8 md:p-12 glow-border space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-secondary-foreground leading-relaxed">
            I'm Saad Shakil — a certified SQA Engineer from ISTQB and PSTB with over 3.5+ years of experience
            helping companies improve software quality and reliability. Based in Karachi, Pakistan, I specialize
            in test planning, execution, defect identification, and automation.
          </p>
          <p className="text-secondary-foreground leading-relaxed">
            I hold a Bachelor's in Computer Science from Dawood University of Engineering & Technology.
            My expertise spans manual and automated testing, performance testing, API testing, and blockchain
            transaction testing. I'm committed to continuous learning and delivering exceptional results
            in fast-paced environments.
          </p>

          {/* Stats bar — game HUD style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center p-4 rounded-lg bg-muted/50 border border-border/50 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 100 + 300}ms` }}>
                <div className="text-2xl font-bold text-primary font-mono">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
