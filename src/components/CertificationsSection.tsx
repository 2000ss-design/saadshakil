import SectionHeading from './SectionHeading';

const certs = [
  { name: 'AWS Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2023' },
  { name: 'Google Cloud Professional Developer', issuer: 'Google Cloud', year: '2022' },
  { name: 'Meta Front-End Developer', issuer: 'Meta / Coursera', year: '2022' },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading title="Certifications" subtitle="Credentials and achievements." />
        <div className="space-y-4">
          {certs.map((c) => (
            <div key={c.name} className="glass rounded-xl p-5 glow-border flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-sm">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.issuer}</p>
              </div>
              <span className="text-xs font-mono text-primary shrink-0 ml-4">{c.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
