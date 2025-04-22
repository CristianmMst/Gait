import Navigation from "./shared/components/Navigation";
import { getUser } from "./(auth)/actions/verifySession";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default async function Home() {
  const user = await getUser();
  return (
    <main className={`flex h-screen ${poppins.className} antialiased`}>
      <Navigation role={user.role} user={user} type={user.type} />
      <section className="flex-1">Home</section>
    </main>
  );
}
