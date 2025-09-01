import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up">
        {/* Header */}
        <div className="text-center animate-fade-in-down">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 hover:scale-110 transition-all duration-200"
          >
            NexoNotes
          </Link>
          <h2 className="mt-4 text-2xl font-bold text-gray-800 animate-bounce-in">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 opacity-0 animate-fade-in animation-delay-200">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4 animate-slide-up opacity-0 animation-delay-300">
          <div className="group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 group-focus-within:text-blue-600 transition-colors"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div className="group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 group-focus-within:text-blue-600 transition-colors"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-105 hover:shadow-lg transition-all duration-300 transform active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Sign up link */}
        <div className="text-center animate-fade-in opacity-0 animation-delay-500">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-all duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
