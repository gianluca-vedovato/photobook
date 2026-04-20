export default function Headline({
  title,
  description,
  headingLevel = "h2",
}: {
  title: string;
  description: string;
  headingLevel?: "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  const Heading = headingLevel;
  return (
    <>
      <Heading className="mb-2 text-2xl font-bold tracking-tight">
        {title}
      </Heading>
      <p className="mb-6 text-muted-foreground">{description}</p>
    </>
  );
}
