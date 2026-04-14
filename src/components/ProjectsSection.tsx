import SectionHeading from './SectionHeading';

const projects = [
  {
    title: 'Bill Payments',
    description: 'An integrated digital payment solution that empowers customers to make all their payments quickly and hassle-free.',
    tags: ['JMeter', 'Playwright', 'API Testing', 'Performance'],
  },
  {
    title: 'Caterpillar',
    description: 'Component Lifecycle Management for Product and Obsolescence — managing entire product life stages and risk treatment.',
    tags: ['Cypress', 'Azure DevOps', 'Regression Testing'],
  },
  {
    title: 'Hazwoper OSHA',
    description: 'A platform providing information, training courses, and resources related to Hazwoper regulations and OSHA compliance.',
    tags: ['Manual Testing', 'Web UI', 'Cross-Browser'],
  },
  {
    title: 'Xoltan Blockchain',
    description: 'Blockchain-based platform containing NFT Marketplace & Tokenization of Coins with MetaMask & Polygon integration.',
    tags: ['Blockchain', 'MetaMask', 'Polygon', 'Postman'],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-secondary/20">
      <div className="container mx-auto">
        <SectionHeading title="Projects" subtitle="Some things I've tested and delivered." />
        <div className="grid md:grid-cols-2 gap-6">
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
