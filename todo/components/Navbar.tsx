export default function Navbar() {
  return (
    <nav className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">ToDo</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-outline btn-ghost btn-md">
          Sign Up / Login
        </button>
      </div>
    </nav>
  );
}
