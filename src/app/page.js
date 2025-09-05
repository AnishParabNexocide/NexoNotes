import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-6xl p-10 space-y-16 bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-700 transform hover:scale-[1.02] relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center animate-fade-in-down">
          <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-500 transform hover:scale-110 cursor-pointer">
            NexoNotes
          </div>
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform"
            >
              Sign Up
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 tracking-tight animate-bounce-in">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse">
              NexoNotes
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl animate-slide-up opacity-0 animation-delay-200">
            Your ultimate note-taking companion. Organize, create, and access your
            notes seamlessly across all your devices.
          </p>
          <div className="space-x-4 animate-slide-up opacity-0 animation-delay-400">
            <Link
              href="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 transform"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border border-blue-600 text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 hover:scale-105 hover:shadow-lg transition-all duration-500 transform"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-in-up animation-delay-600">
          {[
            { title: "Cloud Sync", desc: "Access your notes anywhere, anytime" },
            { title: "Rich Editing", desc: "Format your notes with powerful tools" },
            { title: "Secure", desc: "Your data is safe and encrypted" },
          ].map((feature, i) => (
            <div
              key={i}
              className={`bg-white/90 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500 transform hover:-translate-y-1`}
            >
              <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
