export default function SettingsHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b pb-6">
      <h1 className="font-cal text-emphasis text-xl">{title}</h1>
      <p className="text-subtle text-sm">{description}</p>
    </div>
  );
}
