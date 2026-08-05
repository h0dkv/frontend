import Card from "../ui/Card";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
}: StatsCardProps) {
  return (
    <Card title={title} description={subtitle}>
      <div className="text-4xl font-bold mt-4">
        {value}
      </div>
    </Card>
  );
}