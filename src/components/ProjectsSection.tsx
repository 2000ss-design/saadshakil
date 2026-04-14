import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const projects = [
  {
    title: 'Bill Payments',
    description: 'An integrated digital payment solution that empowers customers to make all their payments quickly and hassle-free.',
    tags: ['JMeter', 'Playwright', 'API Testing', 'Performance'],
    icon: '💳',
  },
  {
    title: 'Caterpillar',
    description: 'Component Lifecycle Management for Product and Obsolescence — managing entire product life stages and risk treatment.',
    tags: ['Cypress', 'Azure DevOps', 'Regression Testing'],
    icon: '⚙️',
  },
  {
    title: 'Hazwoper OSHA',
    description: 'A platform providing information, training courses, and resources related to Hazwoper regulations and OSHA compliance.',
    tags: ['Manual Testing', 'Web UI', 'Cross-Browser'],
    icon: '🛡',
  },
  {
    title: 'Xoltan Blockchain',
    description: 'Blockchain-based platform containing NFT Marketplace & Tokenization of Coins with MetaMask & Polygon integration.',
    tags: ['Blockchain', 'MetaMask', 'Polygon', 'Postman'],
    icon: '⛓',
  },
];

export default function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="projects" className="section-padding bg-secondary/20 relative">
      <div className="container mx-auto">
        <SectionHeading title="Projects" subtitle="Some things I've tested and delivered." />
        <div ref={ref} className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`glass rounded-xl p-6 glow-border group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] relative overflow-hidden ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-primary/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-px h-8 bg-gradient-to-t from-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 h-px w-8 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary font-mono border border-primary/20">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
