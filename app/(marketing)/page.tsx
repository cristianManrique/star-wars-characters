import Link from "next/link";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-bold text-sw-yellow">STAR WARS API</h1>
      <h2 className="font-regular text-sw-beige">
        Fan project - not affiliated with Lucasfilm/Disney
      </h2>
      <p className="text-zinc-500">Browse characters via GraphQL</p>
      <Link
        href="/characters"
        className="rounded-full bg-sw-purple px-6 py-3 text-center
        text-white hover:bg-sw-dark-purple transition-all duration-200 w-60 hover:w-65"
      >
        Characters list
      </Link>
    </main>
  );
};

export default Home;
