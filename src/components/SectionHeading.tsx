interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-16 space-y-3">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
