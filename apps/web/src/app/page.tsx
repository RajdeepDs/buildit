import SignIn from "@/components/signin";

export const runtime = "edge";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <SignIn />
    </div>
  );
}
