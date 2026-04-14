import SectionHeading from './SectionHeading';

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
        <SectionHeading title="Skills" subtitle="Technologies and tools I work with." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="glass rounded-xl p-6 glow-border hover:border-primary/30 transition-colors">
              <h3 className="text-primary font-semibold mb-4 font-mono text-sm tracking-wider">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
