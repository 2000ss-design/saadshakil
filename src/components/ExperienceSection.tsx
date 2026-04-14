import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    role: 'SQA Engineer',
    company: 'TPS Worldwide',
    period: 'Mar 2024 – Present',
    location: 'Karachi, Pakistan',
    description: 'Automated performance testing for Bill Payment and Mobile Money. Developed JMeter scripts for API flow testing. Implemented test automation with Playwright and Cypress. Performed Web UI testing using BlazeMeter.',
  },
  {
    role: 'SQA Engineer',
    company: 'Q-Solutions',
    period: 'Oct 2022 – Feb 2024',
    location: 'Karachi, Pakistan',
    description: 'Performed Load & Stress testing using JMeter. Manual API testing with Postman. Automated testing tasks with Playwright. Tested blockchain transactions through MetaMask & Polygon.',
  },
  {
    role: 'Jr SQA Engineer',
    company: 'The Techrotics Lab',
    period: 'Feb 2022 – Oct 2022',
    location: 'Karachi, Pakistan',
    description: 'Developed comprehensive test plans and test cases. Performed capability testing across devices, OS, and browsers. Conducted regression testing to validate code changes.',
  },
  {
    role: 'Internee SQA Engineer',
    company: 'Digitaurus',
    period: 'Feb 2021 – Jul 2021',
    location: 'Karachi, Pakistan',
    description: 'Created test plans and test cases. Reported bugs to developers. Tested software performance and security. Performed regression testing.',
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <ScrollReveal>
          <SectionHeading title="Experience" subtitle="My professional journey." />
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 0.12} direction="left">
                <div className="relative pl-12">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                  <div className="glass rounded-xl p-6 glow-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{exp.role}</h3>
                      <span className="text-xs font-mono text-primary">{exp.period}</span>
                    </div>
                    <p className="text-sm text-primary/80 mb-1">{exp.company}</p>
                    <p className="text-xs text-muted-foreground mb-2">{exp.location}</p>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
