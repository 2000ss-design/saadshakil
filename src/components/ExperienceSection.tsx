import SectionHeading from './SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const experiences = [
  {
    role: 'Senior SQA Consultant',
    company: 'Xcelliti',
    period: 'Dec 2025 – Present',
    location: 'Karachi, Pakistan',
    bullets: [
      'Automated and executed performance testing of core banking workflows on Temenos T24 — validating scalability, concurrency handling, and system behavior under peak transaction loads.',
      'Designed and automated end-to-end user journeys for OBDX (Meezan Mobile Application), covering login, fund transfers, and account management with focus on functional accuracy and reliability.',
      'Conducted performance testing on BPC payment channels — analyzing transaction throughput, response times, and system stability under high-volume conditions.',
    ],
    level: 'MYTHIC',
    color: 'text-pink-400',
  },
  {
    role: 'SQA Engineer | Performance Test Engineer',
    company: 'TPS Worldwide',
    period: 'Mar 2024 – Dec 2025',
    location: 'Karachi, Pakistan',
    bullets: [
      'Executed API testing for digital wallet, bill payment, and instant payment systems (Raast) — validating request/response integrity, status codes, and transaction accuracy.',
      'Developed and maintained JMeter (.jmx) scripts for end-to-end API flow testing; performed performance testing using PaySim/FimSIM simulators to emulate high-volume financial transactions.',
      'Conducted end-to-end testing of ATM transaction flows, ensuring accurate ISO 8583 financial message processing, authorization handling, and settlement validation.',
      'Designed and implemented automation frameworks using Playwright and Cypress, enabling scalable, maintainable, and efficient web testing.',
    ],
    level: 'LEGENDARY',
    color: 'text-yellow-400',
  },
  {
    role: 'SQA Engineer',
    company: 'Q-Solutions',
    period: 'Oct 2022 – Feb 2024',
    location: 'Karachi, Pakistan',
    bullets: [
      'Performed Load & Stress testing using JMeter.',
      'Manual REST API testing with Postman.',
      'Automated repetitive testing tasks through Playwright.',
      'Identified and tracked bugs; tested blockchain transaction flows via MetaMask & Polygon.',
    ],
    level: 'EPIC',
    color: 'text-purple-400',
  },
  {
    role: 'Jr SQA Engineer',
    company: 'The Techrotics Lab',
    period: 'Feb 2022 – Oct 2022',
    location: 'Karachi, Pakistan',
    bullets: [
      'Developed comprehensive test plans outlining testing approach.',
      'Wrote test cases and scripts based on functional specifications and user requirements.',
      'Performed capability testing across devices, OS, and browsers.',
      'Conducted regression testing to validate code changes.',
    ],
    level: 'RARE',
    color: 'text-blue-400',
  },
  {
    role: 'Internee SQA Engineer',
    company: 'Digitaurus',
    period: 'Feb 2021 – Jul 2021',
    location: 'Karachi, Pakistan',
    bullets: [
      'Created test plans and test cases.',
      'Reported bugs to developers.',
      'Tested software performance and security.',
      'Performed regression testing to ensure stability.',
    ],
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
