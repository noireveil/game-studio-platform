import { Gamepad2, Trophy, Users, Zap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]"></div>

        <header className="relative z-10 container mx-auto px-6 py-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-45">
                <Gamepad2 className="w-6 h-6 text-blue-900 -rotate-45" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter">POOL MASTER</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-white hover:text-yellow-400 font-bold transition-colors">FEATURES</a>
              <a href="#gameplay" className="text-white hover:text-yellow-400 font-bold transition-colors">GAMEPLAY</a>
              <a href="#download" className="text-white hover:text-yellow-400 font-bold transition-colors">DOWNLOAD</a>
            </div>
          </nav>
        </header>

        <section className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="mb-8 inline-block">
            <div className="bg-red-600 text-white px-6 py-2 font-black text-sm tracking-widest transform -rotate-2 shadow-lg">
              NOW AVAILABLE
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-white mb-4 tracking-tighter leading-none">
            POOL
            <br />
            <span className="text-yellow-400">MASTER</span>
          </h1>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50"></div>
            <p className="relative text-2xl md:text-3xl text-white font-bold mb-12 tracking-wide">
              THE ULTIMATE 8-BALL EXPERIENCE
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button className="group relative px-12 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-xl tracking-wider hover:scale-105 transition-transform shadow-2xl">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute -inset-1 bg-red-400 opacity-50 blur group-hover:blur-lg transition-all"></div>
              <span className="relative">PLAY NOW</span>
            </button>
            <button className="px-12 py-5 bg-white text-blue-900 font-black text-xl tracking-wider hover:bg-yellow-400 hover:scale-105 transition-all shadow-2xl">
              WATCH TRAILER
            </button>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-600 blur-2xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-8 shadow-2xl border-4 border-yellow-400">
              <div className="aspect-video bg-gradient-to-br from-green-700 to-green-900 rounded flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className="border border-green-600"></div>
                  ))}
                </div>

                <div className="relative z-10 space-y-8">
                  <div className="flex justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-800 shadow-lg"></div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-4 border-gray-800 shadow-lg"></div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 border-4 border-gray-800 shadow-lg"></div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 border-4 border-gray-800 shadow-lg"></div>
                    <div className="w-16 h-16 rounded-full bg-black border-4 border-gray-800 shadow-lg flex items-center justify-center">
                      <span className="text-white font-black text-xl">8</span>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 border-4 border-gray-800 shadow-lg"></div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative z-10 container mx-auto px-6 py-20">
          <h2 className="text-5xl md:text-6xl font-black text-white text-center mb-16 tracking-tighter">
            GAME <span className="text-yellow-400">FEATURES</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 border-4 border-yellow-400 hover:border-red-500 transition-colors shadow-xl">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">FAST ACTION</h3>
              <p className="text-blue-200 font-bold leading-relaxed">
                Lightning-fast gameplay with smooth physics and instant response times
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 border-4 border-yellow-400 hover:border-red-500 transition-colors shadow-xl">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">MULTIPLAYER</h3>
              <p className="text-blue-200 font-bold leading-relaxed">
                Challenge friends locally or compete against players worldwide
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 border-4 border-yellow-400 hover:border-red-500 transition-colors shadow-xl">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">TOURNAMENTS</h3>
              <p className="text-blue-200 font-bold leading-relaxed">
                Compete in ranked tournaments and climb the global leaderboards
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-8 border-4 border-yellow-400 hover:border-red-500 transition-colors shadow-xl">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Gamepad2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">ARCADE MODE</h3>
              <p className="text-blue-200 font-bold leading-relaxed">
                Classic arcade-style challenges with power-ups and bonuses
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
              READY TO PLAY?
            </h2>
            <p className="text-2xl text-white font-bold mb-8">
              Join thousands of players worldwide
            </p>
            <button className="px-16 py-6 bg-blue-900 text-white font-black text-2xl tracking-wider hover:bg-blue-950 hover:scale-105 transition-all shadow-2xl border-4 border-white">
              GET STARTED
            </button>
          </div>
        </section>

        <footer className="relative z-10 bg-blue-950 py-12 border-t-4 border-yellow-400">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center transform rotate-45">
                <Gamepad2 className="w-5 h-5 text-blue-900 -rotate-45" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">POOL MASTER</span>
            </div>
            <p className="text-blue-300 font-bold">
              © 2025 POOL MASTER. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
