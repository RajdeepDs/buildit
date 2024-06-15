import WelcomePageClient from "./page-client";

export const runtime = "edge";

export default function WelcomePage(): JSX.Element {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="flex flex-col items-center">
        <WelcomePageClient />
      </div>
    </div>
  );
}
