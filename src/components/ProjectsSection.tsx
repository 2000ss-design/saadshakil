import SectionHeading from './SectionHeading';

const projects = [
  {
    title: 'CloudDash',
    description: 'Real-time cloud infrastructure monitoring dashboard with alerting and analytics.',
    tags: ['React', 'Node.js', 'AWS', 'WebSocket'],
  },
  {
    title: 'PixelForge',
    description: 'AI-powered image editing platform with collaborative features and real-time rendering.',
    tags: ['Next.js', 'Python', 'TensorFlow', 'WebGL'],
  },
  {
    title: 'DevConnect',
    description: 'Social platform for developers to share projects, collaborate, and find mentors.',
    tags: ['React', 'GraphQL', 'PostgreSQL', 'Docker'],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <SectionHeading title="Projects" subtitle="Some things I've built." />
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.title} className="glass rounded-xl p-6 glow-border group hover:border-primary/40 transition-all hover:-translate-y-1 duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary font-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
