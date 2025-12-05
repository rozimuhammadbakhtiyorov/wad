import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a202c] text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold mb-4">WAD</h1>
        <p className="text-2xl text-gray-400">We Are Developers</p>
      </div>

      {/* Network Image */}
      <div className="mb-12 max-w-2xl w-full">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 shadow-2xl relative overflow-hidden">
          {/* Network visualization placeholder */}
          <div className="relative z-10">
            <svg className="w-full h-64" viewBox="0 0 600 300">
              {/* Network nodes and connections */}
              <g opacity="0.6">
                {/* Connections */}
                <line x1="100" y1="150" x2="300" y2="100" stroke="#4A5568" strokeWidth="1" />
                <line x1="300" y1="100" x2="500" y2="150" stroke="#4A5568" strokeWidth="1" />
                <line x1="100" y1="150" x2="200" y2="250" stroke="#4A5568" strokeWidth="1" />
                <line x1="200" y1="250" x2="400" y2="250" stroke="#4A5568" strokeWidth="1" />
                <line x1="400" y1="250" x2="500" y2="150" stroke="#4A5568" strokeWidth="1" />
                <line x1="300" y1="100" x2="300" y2="200" stroke="#4A5568" strokeWidth="1" />
                
                {/* Nodes */}
                <circle cx="100" cy="150" r="4" fill="#60A5FA" />
                <circle cx="300" cy="100" r="4" fill="#60A5FA" />
                <circle cx="500" cy="150" r="4" fill="#60A5FA" />
                <circle cx="200" cy="250" r="4" fill="#60A5FA" />
                <circle cx="400" cy="250" r="4" fill="#60A5FA" />
                <circle cx="300" cy="200" r="4" fill="#60A5FA" />
              </g>
              
              {/* Center glow */}
              <circle cx="300" cy="150" r="40" fill="url(#gradient)" opacity="0.8" />
              <defs>
                <radialGradient id="gradient">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <h2 className="text-4xl font-bold text-center mb-4 max-w-3xl leading-tight">
        Showcase Your Skills.<br />Build Your Legacy.
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-400 text-center max-w-2xl mb-12 leading-relaxed">
        Join a community of top-tier software engineers. Showcase your projects, validate your skills, and connect with innovative companies.
      </p>

      {/* CTA Button */}
      <Link
        href="/register"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-12 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl w-full max-w-xl text-center"
      >
        Get Started
      </Link>

      {/* Sign In Link */}
      <p className="mt-6 text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:text-blue-400">
          Log In
        </Link>
      </p>
    </div>
  );
}
