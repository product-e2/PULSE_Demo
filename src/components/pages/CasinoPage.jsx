import { useDemo } from '../../state/DemoContext';
import { motion } from 'framer-motion';

const SLOTS = [
  { name: 'Book of Ra Deluxe', stars: 5 },
  { name: 'Starburst XXXtreme', stars: 5 },
  { name: 'Gates of Olympus', stars: 4 },
  { name: 'Sweet Bonanza', stars: 4 },
  { name: 'Wolf Gold', stars: 5 },
  { name: 'Big Bass Splash', stars: 4 },
];

const OPERATORS = [
  { name: 'LeoVegas', rating: '4.8' },
  { name: 'PokerStars Casino', rating: '4.6' },
  { name: '888 Casino', rating: '4.5' },
];

function StarRating({ count }) {
  return (
    <span className="text-amber-400 text-sm tracking-wide">
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </span>
  );
}

export default function CasinoPage() {
  const { state } = useDemo();
  const { adActivated, currentAct } = state;
  const isVision = currentAct === 4;
  return (
    <div className="min-h-full bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-8">
          <span className="text-xl font-extrabold" style={{ color: '#f59e0b' }}>
            CasinoReview
          </span>
          <nav className="flex items-center gap-4 text-sm text-gray-400">
            <span className="hover:text-white cursor-pointer">Slots</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer">Live Casino</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer">Bonuses</span>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer">Reviews</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-8 text-center">
        <h1
          className="text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
        >
          Best Online Slots 2026
        </h1>
        <p className="mt-3 text-gray-400 text-lg max-w-2xl mx-auto">
          Expert-reviewed and ranked. Discover the highest-paying, most exciting slot games available at top-rated online casinos.
        </p>
      </section>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 pb-16 flex gap-8">
        {/* Main grid */}
        <main className="flex-1">
          <div className="grid grid-cols-3 gap-5">
            {SLOTS.map((slot) => (
              <div
                key={slot.name}
                className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer group"
              >
                {/* Gradient placeholder image */}
                <div className="h-40 bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                  <span className="text-3xl opacity-50">🎰</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm leading-tight">{slot.name}</h3>
                  <div className="mt-1">
                    <StarRating count={slot.stars} />
                  </div>
                  <span
                    className="inline-block mt-3 text-xs font-semibold tracking-wide group-hover:translate-x-0.5 transition-transform"
                    style={{ color: '#f59e0b' }}
                  >
                    Play Now &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-72 shrink-0 space-y-6">
          {/* Top Operators */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#f59e0b' }}>
              Top Operators
            </h3>
            <ul className="space-y-3">
              {OPERATORS.map((op) => (
                <li key={op.name} className="flex items-center justify-between text-sm">
                  <span className="text-gray-200">{op.name}</span>
                  <span className="text-amber-400 font-medium">{op.rating}★</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Bonus / Ad slot */}
          {adActivated && isVision ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden ring-2 ring-sky-400/50"
            >
              <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-between bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
                <span>LeoVegas</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider font-medium">For You</span>
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <p className="text-xs text-sky-400 font-semibold uppercase tracking-wide mb-1">Carlos, take flight!</p>
                <div className="text-3xl my-2">🚀</div>
                <p className="text-white font-bold text-lg">Aviator Exclusive</p>
                <p className="text-sky-300 font-bold text-xl mt-1">200 Free Rounds</p>
                <p className="text-xs text-gray-400 mt-1">+ 50% cashback on first session</p>
                <div className="mt-3 w-full bg-gray-800 rounded-lg p-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Your game:</span>
                    <span className="text-sky-300 font-semibold">Aviator</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-gray-400">Max multiplier:</span>
                    <span className="text-amber-400 font-semibold">100x</span>
                  </div>
                </div>
                <button className="mt-3 w-full text-center text-sm font-semibold py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:opacity-90 transition-opacity">
                  Play Aviator Now →
                </button>
                <p className="text-[10px] text-gray-600 mt-2">18+ | T&Cs apply</p>
              </div>
            </motion.div>
          ) : adActivated ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden ring-2 ring-amber-400/50"
            >
              <div
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center justify-between"
                style={{ backgroundColor: '#f59e0b' }}
              >
                <span>Latest Bonus</span>
                <span className="text-[10px] text-gray-900/50 uppercase tracking-wider font-medium">Sponsored</span>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-white">LeoVegas</p>
                <p className="text-amber-400 text-lg font-bold mt-1">100 Free Spins</p>
                <p className="text-xs text-gray-500 mt-2">New players only. T&amp;Cs apply. 18+</p>
                <button
                  className="mt-3 w-full text-center text-sm font-semibold py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: '#f59e0b', color: '#111827' }}
                >
                  Claim Bonus
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: '#f59e0b' }}>
                <span className="text-sm font-bold text-gray-900">LeoVegas</span>
                <span className="text-[10px] text-gray-900/50 uppercase tracking-wider">Ad</span>
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Welcome Package</p>
                <p className="text-white font-bold text-base">100% Deposit Match</p>
                <p className="text-amber-400 font-bold text-lg mt-1">Up to €500</p>
                <p className="text-xs text-gray-500 mt-1">+ 50 Free Spins</p>
                <button className="mt-3 text-sm font-semibold px-6 py-2 rounded-lg" style={{ backgroundColor: '#f59e0b', color: '#111827' }}>
                  Join Now →
                </button>
                <p className="text-[10px] text-gray-600 mt-2">18+ | T&Cs apply</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
