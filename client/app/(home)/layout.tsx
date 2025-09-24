import { getUser } from "../(auth)/actions/verifySession";
import Navigation from "../shared/components/Navigation/Navigation";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <main className="flex h-screen">
      <Navigation user={user} />
      <section className="flex-1 max-h-svh overflow-y-auto">{children}</section>
    </main>
  );
}
