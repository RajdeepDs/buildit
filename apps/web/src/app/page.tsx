import { Button } from "@buildit/ui";
import Image from "next/image";

export const runtime = "edge";

export default async function Home() {
  return (
    <main className="container">
      <nav className="flex items-center justify-between py-2 md:p-2">
        <div className="flex items-center space-x-2">
          <Image src="/buildit-logo.svg" alt="logo" width={30} height={30} />
          <h1 className="font-cal text-strong text-xl">BuildIt</h1>
        </div>
        <div className="flex space-x-2">
          <Button className="" color="secondary" href={"/login"}>
            Login
          </Button>
          <Button className="hidden md:flex" href={"/signup"}>
            Get BuildIt free
          </Button>
        </div>
      </nav>
      <section className="mt-28 flex flex-col items-center justify-center space-y-16">
        <div className="space-y-4 text-center text-strong">
          <h1 className="font-cal text-3xl lg:text-5xl">
            Build better, Together with BuildIt
          </h1>
          <p className="font-medium text-base text-strong leading-snug md:text-lg">
            Collaborate seamlessly and manage your projects{" "}
            <br className="hidden md:flex" /> efficiently with BuildIt's
            powerful, open-source platform.
          </p>
          <Button href={"/signup"}>Get BuildIt free</Button>
        </div>
        <Image
          src={"/dashboard.png"}
          alt="Dashboard"
          height={516}
          width={882}
          className="rounded-lg border shadow-lg"
        />
      </section>
    </main>
  );
}
