import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-md p-10 space-y-8 bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-700 transform hover:scale-[1.02] relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-110"
          >
            NexoNotes
          </Link>
          <div className="mt-6 space-y-2">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 font-medium tracking-wide">
              Sign in to your account to continue your journey
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          <div className="group relative">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="block w-full px-4 py-4 border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 hover:border-slate-300 transition-all duration-300 bg-white/90 backdrop-blur-sm placeholder-slate-400 text-slate-800 font-medium"
                placeholder="Enter your email address"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-indigo-500/5 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>

          <div className="group relative">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-2 group-focus-within:text-blue-600 transition-colors duration-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="block w-full px-4 py-4 border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 hover:border-slate-300 transition-all duration-300 bg-white/90 backdrop-blur-sm placeholder-slate-400 text-slate-800 font-medium"
                placeholder="Enter your password"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-indigo-500/0 group-focus-within:from-blue-500/5 group-focus-within:via-purple-500/5 group-focus-within:to-indigo-500/5 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center group">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-5 w-5 text-blue-600 focus:ring-blue-500/50 border-slate-300 rounded-lg transition duration-300 hover:scale-110 cursor-pointer"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-slate-600 font-medium cursor-pointer group-hover:text-slate-800 transition-colors duration-200"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-300 transform hover:scale-105"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:scale-105 transition-all duration-500 transform active:scale-95 overflow-hidden group"
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
          </button>
        </form>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-slate-600 font-medium">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 font-bold hover:underline transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}