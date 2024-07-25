import Image from "next/image";
import Link from "next/link";

export default function PoweredBy(): JSX.Element {
  return (
    <section className="flex flex-col items-center space-y-4 py-36 md:space-y-6 md:py-40">
      {/* Small Screens */}
      <div className="flex items-center space-x-4 md:hidden md:space-x-16">
        <Link href="https://vercel.com" target="_blank">
          <Image src={"/vercel.svg"} alt="Vercel" width={70} height={70} />
        </Link>
        <Link href={"https://nextjs.org/"} target="_blank">
          <Image src={"/next.svg"} alt="Nextjs" width={70} height={70} />
        </Link>
        <Link href={"https://turso.tech/"} target="_blank">
          <Image src={"/Turso.svg"} alt="Turso" width={70} height={70} />
        </Link>
        <Link href={"https://orm.drizzle.team/"} target="_blank">
          <Image src={"/Drizzle.svg"} alt="Drizzle" width={70} height={70} />
        </Link>
      </div>

      {/* Large Screens */}
      <div className="hidden items-center space-x-4 md:flex md:space-x-16">
        <Link href="https://vercel.com" target="_blank">
          <Image src={"/vercel.svg"} alt="Vercel" width={120} height={120} />
        </Link>
        <Link href={"https://nextjs.org/"} target="_blank">
          <Image src={"/next.svg"} alt="Nextjs" width={120} height={120} />
        </Link>
        <Link href={"https://turso.tech/"} target="_blank">
          <Image src={"/Turso.svg"} alt="Turso" width={120} height={120} />
        </Link>
        <Link href={"https://orm.drizzle.team/"} target="_blank">
          <Image src={"/Drizzle.svg"} alt="Drizzle" width={120} height={120} />
        </Link>
      </div>
      <p className="text-soft text-xs">Powered by</p>
    </section>
  );
}
