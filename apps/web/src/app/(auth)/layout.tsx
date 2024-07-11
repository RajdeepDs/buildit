import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: { children: ReactNode }): JSX.Element {
  return (
    <div className="container flex h-dvh flex-col">
      <nav className="flex py-4">
        <Link href={"/"}>
          <Image src={"/buildit-logo.svg"} width={30} height={30} alt="Logo" />
        </Link>
      </nav>
      <main className="mx-auto mt-32 flex w-full flex-1 justify-center">
        {children}
      </main>
    </div>
  );
}
