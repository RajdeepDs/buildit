import { auth, signIn, signOut } from "@buildit/auth";
import { Button } from "@buildit/ui";

export default async function SignIn() {
  const user = await auth();
  if (!user) {
    return (
      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signIn("github");
          }}
        >
          Sign in with Github
        </Button>
      </form>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {user.user.name}</span>
      </p>

      <form>
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signOut();
          }}
        >
          Sign out
        </Button>
      </form>
    </div>
  );
}
