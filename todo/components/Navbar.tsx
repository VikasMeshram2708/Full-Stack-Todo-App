import Link from "next/link";
import { DecodeToken } from "@/helpers/DecodeToken";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  // @ts-ignore
  const data: TokenData = DecodeToken();
  return (
    <nav className="navbar bg-base-300">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          ToDo
        </Link>
      </div>
      <div className="flex-none">
        {data && <LogoutButton email={data?.email} />}
        {!data && (
          <button className="btn btn-outline btn-ghost btn-md">
            <Link href="/login">Sign Up / Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
