export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <aside></aside>
      <main>{children}</main>
    </div>
  );
}
