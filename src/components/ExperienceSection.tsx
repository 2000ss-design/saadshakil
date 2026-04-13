import SectionHeading from './SectionHeading';

const experiences = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    period: '2022 – Present',
    description: 'Leading development of cloud-native applications, mentoring junior developers, and architecting scalable microservices.',
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Studio',
    period: '2020 – 2022',
    description: 'Built interactive web experiences and design systems for enterprise clients using React and TypeScript.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'StartupXYZ',
    period: '2019 – 2020',
    description: 'Developed RESTful APIs and contributed to the core product, improving performance by 40%.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading title="Experience" subtitle="My professional journey." />
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-12">
                {/* Dot */}
                <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                <div className="glass rounded-xl p-6 glow-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <span className="text-xs font-mono text-primary">{exp.period}</span>
                  </div>
                  <p className="text-sm text-primary/80 mb-2">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
