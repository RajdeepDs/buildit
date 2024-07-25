import FeaturesSection from "@/components/marketing/features";
import HeroSection from "@/components/marketing/hero";
import JoinCommunity from "@/components/marketing/join-community";
import NavBar from "@/components/marketing/nav";
import PoweredBy from "@/components/marketing/powered-by";

import { Button } from "@buildit/ui";

export const runtime = "edge";

export default async function Home() {
  return (
    <main className="mx-3 py-3 md:container">
      <NavBar />
      <HeroSection />
      <PoweredBy />
      <section className="grid items-center justify-between space-y-4 px-7 py-16 md:py-32 lg:grid-cols-2 lg:flex-row">
        <h1 className="font-cal text-4xl text-strong leading-12 md:text-7xl">
          Plan, <br className="hidden md:block" /> Execute &{" "}
          <br className="hidden md:block" /> Deliver.
        </h1>
        <p className="font-bold text-soft text-xl tracking-wide md:text-4xl">
          Easier way to <span className="text-strong">plan</span>, track, and
          manage projects. Create your{" "}
          <span className="text-strong">issues</span> using one platform. Use
          one tool to <span className="text-strong">collaborate</span>, update
          progress, and achieve <span className="text-strong">goals</span>{" "}
          seamlessly.
        </p>
      </section>
      <FeaturesSection />
      <JoinCommunity />
      <section className="space-y-4 px-7 py-16 lg:flex lg:justify-between lg:py-32">
        <h1 className="font-cal text-2xl text-strong leading-12 lg:text-6xl">
          Join us Today! <br /> Get started with BuildIt.
        </h1>
        <div className="flex items-center space-x-4">
          <Button
            color="secondary"
            className="md:h-14 md:px-6 md:text-lg"
            href={"/login"}
          >
            Login
          </Button>
          <Button className="md:h-14 md:px-6 md:text-lg" href={"/signup"}>
            Get started free
          </Button>
        </div>
      </section>
    </main>
  );
}
