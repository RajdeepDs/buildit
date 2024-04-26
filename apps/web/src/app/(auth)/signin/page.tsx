import SignIn from "@/components/signin";

export default function SignInPage(): JSX.Element {
  return (
    <div className="h-dvh w-dvw flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-5 text-xl font-semibold">Sign In</h1>
        <SignIn />
      </div>
    </div>
  );
}
