import WelcomePageClient from "./page-client";

export const runtime = "edge";

export default function WelcomePage(): JSX.Element {
  return (
    <div className="h-dvh w-dvw flex items-center justify-center">
      <div className="flex flex-col items-center">
        <WelcomePageClient />
      </div>
    </div>
  );
}
