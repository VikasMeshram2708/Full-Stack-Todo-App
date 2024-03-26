export default function Login() {
  return (
    <section className="min-h-screen">
      <form className="mt-10 max-w-md mx-auto p-5 rounded-md border-2 border-slate-400">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        {/* Email */}
        <div className="grid gap-3 mb-5">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter name"
            className="input input-bordered"
          />
        </div>

        {/* Password */}
        <div className="grid gap-3">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Enter password"
            className="input input-bordered"
          />
        </div>

        {/* Button */}
        <div className="mt-5">
          <button
            type="button"
            className="btn btn-md w-full btn-outline btn-accent font-semibold"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
}
