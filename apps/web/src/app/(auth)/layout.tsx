export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex h-screen w-screen justify-center">
      {children}
    </div>
  );
}
