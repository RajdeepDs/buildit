import { auth, signIn, signOut } from "@buildit/auth";

export default async function SignIn() {
  const user = await auth();
  if (!user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button
          type="submit"
          className="items-center rounded-md bg-black px-3 py-2 text-white"
        >
          Signin with GitHub
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {user.user.name}</span>
      </p>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button
          className="items-center rounded-md bg-black px-3 py-2 text-white"
          type="submit"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
