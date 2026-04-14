import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

const skillCategories = [
  {
    title: 'Automation',
    skills: ['Playwright', 'Cypress', 'Web Automation', 'BlazeMeter'],
  },
  {
    title: 'API & Performance',
    skills: ['Postman', 'JMeter', 'REST API Testing', 'Load & Stress Testing'],
  },
  {
    title: 'Tools & Platforms',
    skills: ['Azure DevOps', 'Git / GitHub', 'Lambda Test', 'Testworthy'],
  },
  {
    title: 'Testing & Other',
    skills: ['Manual Testing', 'Regression Testing', 'Blockchain Testing', 'ISTQB Certified'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <ScrollReveal>
          <SectionHeading title="Skills" subtitle="Technologies and tools I work with." />
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.1} direction="scale">
              <div className="glass rounded-xl p-6 glow-border hover:border-primary/30 hover:scale-[1.03] transition-all duration-300 h-full">
                <h3 className="text-primary font-semibold mb-4 font-mono text-sm tracking-wider">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200">{s}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
