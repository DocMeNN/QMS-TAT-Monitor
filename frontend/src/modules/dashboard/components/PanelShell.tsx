interface Props {
  title: string;
  children: React.ReactNode;
}

export default function PanelShell({
  title,
  children,
}: Props) {
  return (
    <div className="dashboard-card">
      <h3 className="text-cyan-300 font-semibold mb-4">
        {title}
      </h3>

      {children}
    </div>
  );
}