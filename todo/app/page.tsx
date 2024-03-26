import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mt-24 flex justify-center">
        <button
          type="button"
          className="btn btn-outline btn-base-300 btn-md rounded-full"
        >
          <Link href="/todos">Get Started</Link>
        </button>
      </div>
    </main>
  );
}
