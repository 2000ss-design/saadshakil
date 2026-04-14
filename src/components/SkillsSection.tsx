import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const skillCategories = [
  {
    title: 'Automation',
    icon: '⚡',
    skills: [
      { name: 'Playwright', level: 90 },
      { name: 'Cypress', level: 85 },
      { name: 'Web Automation', level: 88 },
      { name: 'BlazeMeter', level: 75 },
    ],
  },
  {
    title: 'API & Performance',
    icon: '🚀',
    skills: [
      { name: 'Postman', level: 92 },
      { name: 'JMeter', level: 88 },
      { name: 'REST API Testing', level: 90 },
      { name: 'Load & Stress Testing', level: 85 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: '🛠',
    skills: [
      { name: 'Azure DevOps', level: 80 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'Lambda Test', level: 78 },
      { name: 'Testworthy', level: 82 },
    ],
  },
  {
    title: 'Testing & Other',
    icon: '🎯',
    skills: [
      { name: 'Manual Testing', level: 95 },
      { name: 'Regression Testing', level: 90 },
      { name: 'Blockchain Testing', level: 75 },
      { name: 'ISTQB Certified', level: 100 },
    ],
  },
];

export default function SkillsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="skills" className="section-padding bg-secondary/20 relative">
      <div className="container mx-auto">
        <SectionHeading title="Skills" subtitle="Technologies and tools I work with." />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`glass rounded-xl p-6 glow-border hover:border-primary/40 transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${ci * 120}ms` }}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h3 className="text-primary font-semibold mb-4 font-mono text-sm tracking-wider">{cat.title}</h3>
              <div className="space-y-3">
                {cat.skills.map((s, si) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="text-primary font-mono">{s.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${s.level}%` : '0%',
                          transitionDelay: `${ci * 120 + si * 80 + 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
