import SectionHeading from './SectionHeading';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Three.js'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'DevOps & Cloud',
    skills: ['AWS', 'Docker', 'CI/CD', 'Kubernetes', 'Terraform'],
  },
  {
    title: 'Tools & Other',
    skills: ['Git', 'Figma', 'Agile', 'Linux', 'Testing'],
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
