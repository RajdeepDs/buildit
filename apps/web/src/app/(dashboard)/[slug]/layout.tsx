import Sidebar from "@/components/dashboard/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh flex">
      <aside className="h-full w-[250px] border">
        <Sidebar />
      </aside>
      <main>{children}</main>
    </div>
  );
}
