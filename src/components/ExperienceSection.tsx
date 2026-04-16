import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const experiences = [
  {
    role: 'SQA Engineer',
    company: 'TPS Worldwide',
    period: 'Mar 2024 – Present',
    location: 'Karachi, Pakistan',
    description: 'Automated performance testing for Bill Payment and Mobile Money. Developed JMeter scripts for API flow testing. Implemented test automation with Playwright and Cypress. Performed Web UI testing using BlazeMeter.',
    level: 'LEGENDARY',
    color: 'text-yellow-400',
  },
  {
    role: 'SQA Engineer',
    company: 'Q-Solutions',
    period: 'Oct 2022 – Feb 2024',
    location: 'Karachi, Pakistan',
    description: 'Performed Load & Stress testing using JMeter. Manual API testing with Postman. Automated testing tasks with Playwright. Tested blockchain transactions through MetaMask & Polygon.',
    level: 'EPIC',
    color: 'text-purple-400',
  },
  {
    role: 'Jr SQA Engineer',
    company: 'The Techrotics Lab',
    period: 'Feb 2022 – Oct 2022',
    location: 'Karachi, Pakistan',
    description: 'Developed comprehensive test plans and test cases. Performed capability testing across devices, OS, and browsers. Conducted regression testing to validate code changes.',
    level: 'RARE',
    color: 'text-blue-400',
  },
  {
    role: 'Internee SQA Engineer',
    company: 'Digitaurus',
    period: 'Feb 2021 – Jul 2021',
    location: 'Karachi, Pakistan',
    description: 'Created test plans and test cases. Reported bugs to developers. Tested software performance and security. Performed regression testing.',
    level: 'COMMON',
    color: 'text-green-400',
  },
];

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="section-padding relative">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading title="Experience" subtitle="My professional journey — quest log." />
        <div ref={ref} className="relative">
          <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent" />
          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative pl-9 sm:pl-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="absolute left-1.5 sm:left-2.5 top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)] animate-pulse-glow" />
                <div className="glass rounded-xl p-4 sm:p-6 glow-border group hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_hsl(var(--primary)/0.1)]">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground">{exp.role}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] sm:text-[10px] font-mono font-bold ${exp.color} px-1.5 sm:px-2 py-0.5 rounded border border-current/30`}>{exp.level}</span>
                      <span className="text-[10px] sm:text-xs font-mono text-primary">{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-primary/80 mb-1">{exp.company}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">{exp.location}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
