import Image from "next/image";

import { getSession } from "@/lib/data/get-session";
import { Button } from "@buildit/ui";

export default async function NavBar(): Promise<JSX.Element> {
  const session = await getSession();

  return (
    <nav className="sticky top-4 z-50 flex items-center justify-between rounded-xl border border-soft bg-weak/60 p-3 backdrop-blur-xl md:p-4">
      <div className="flex items-center space-x-2">
        <Image src={"/buildit-logo.svg"} alt="Buildit" width={30} height={30} />
        <h1 className="mt-1 font-cal text-xl">BuildIt</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          color="minimal"
          className="text-sub hover:bg-soft"
          href={"/login"}
        >
          {session ? "Dashboard" : "Login"}
        </Button>
        <Button className="hidden ">Get BuildIt free</Button>
      </div>
    </nav>
  );
}
