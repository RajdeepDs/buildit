import Image from "next/image";
import Link from "next/link";

import { Icons } from "@buildit/ui/icons";

export default function JoinCommunity(): JSX.Element {
  return (
    <section className="space-y-7 px-7 py-32">
      <div className="flex flex-col items-center space-y-7 text-center">
        <h1 className="font-cal text-2xl text-strong md:text-5xl">
          Join our community
        </h1>
        <p className="font-medium text-sm text-soft lg:text-lg">
          Stay connected with BuildIt's latest updates and contributions.
          <br className="hidden md:block" /> Explore our GitHub repo and follow
          us on Twitter.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="relative h-[140px] space-y-4 rounded-xl border border-soft bg-weak p-4">
          <div className="flex items-center space-x-2">
            <Image src={"/github.svg"} width={30} height={30} alt="github" />
            <h1 className="font-semibold text-lg text-strong">GitHub</h1>
          </div>
          <p className="font-medium text-soft text-xs md:text-sm">
            Our source code is available on GitHub - feel free to contribute to
            it
          </p>
          <Link
            href={"https://github.com/RajdeepDs/buildit"}
            target="_blank"
            className="absolute bottom-4 flex items-center font-semibold text-sm text-sub"
          >
            Explore
            <Icons.arrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="relative h-[140px] space-y-4 rounded-xl border border-soft bg-weak p-4">
          <div className="flex items-center space-x-2">
            <Image src={"/X.svg"} width={20} height={20} alt="github" />
            <h1 className="font-semibold text-lg text-strong">X/Twitter</h1>
          </div>
          <p className="font-medium text-soft text-xs md:text-sm">
            Keep up to date with the latest releases, features and improvements.
          </p>
          <Link
            href={"https://twitter.com/Rajdeep__ds"}
            target="_blank"
            className="absolute bottom-4 flex items-center font-semibold text-sm text-sub"
          >
            Follow
            <Icons.arrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
