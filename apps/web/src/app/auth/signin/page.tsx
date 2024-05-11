import SignInForm from "./form";

export const runtime = "edge";

export default function SignIn(): JSX.Element {
  return (
    <div className="h-dvh flex w-full flex-col items-center justify-center">
      <h1 className="mb-3 text-2xl font-semibold">Sign In</h1>
      <div className="w-fit">
        <SignInForm />
      </div>
    </div>
  );
}
