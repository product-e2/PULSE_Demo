import { useDemo } from '../../state/DemoContext';
import { motion } from 'framer-motion';

export default function LiveScoreSportsPage() {
  const { state } = useDemo();
  const { adActivated, currentAct } = state;
  const isVision = currentAct === 4;
  const isGameWon = currentAct === 3;

  const categoryPills = [
    'Home', 'Football', 'Predictions', 'Premier League', 'Daily News Roundups', 'Promotions'
  ];

  return (
    <div className="min-h-full bg-[#111111] font-sans">
      {/* Header */}
      <header className="bg-[#111111] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-8">
          <img src="https://www.livescore.com/ls-web-assets/images/live-score-outlined-74d06.webp" alt="LiveScore" className="h-5" />
          <nav className="flex items-center gap-6 text-sm">
            <span className="text-[#aaaaaa] hover:text-[#fdfdfd] cursor-pointer transition-colors">Scores</span>
            <span className="relative text-[#fdfdfd] cursor-pointer font-medium pb-0.5">
              News
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff6b00] rounded-full" />
            </span>
            <span className="text-[#aaaaaa] hover:text-[#fdfdfd] cursor-pointer transition-colors">Favourites</span>
          </nav>
        </div>
      </header>

      {/* Category Pill Bar */}
      <div className="bg-[#111111] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
          {categoryPills.map((pill, i) => (
            <span
              key={pill}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                i === 0
                  ? 'bg-[#fdfdfd] text-[#111111] border-[#fdfdfd]'
                  : 'bg-transparent text-[#aaaaaa] border-[#333333] hover:border-[#555555] hover:text-[#fdfdfd]'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Article area */}
      <div className="max-w-7xl mx-auto px-4 py-8 pb-12 flex gap-8">
        {/* Main column */}
        <main className="flex-1 min-w-0">
          {/* Category tag */}
          <span className="inline-block bg-[#ff6b00] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded mb-4">
            Match Preview
          </span>

          {/* Headline */}
          <h1 className="text-4xl font-bold text-[#fdfdfd] leading-tight mb-3">
            Bayern M&uuml;nchen vs Borussia Dortmund: Der Klassiker Preview
          </h1>

          {/* Meta line */}
          <p className="text-sm text-[#aaaaaa] mb-2">
            Published: March 20, 2026 | 3 min read
          </p>

          {/* Author */}
          <p className="text-sm text-[#aaaaaa] mb-6">
            By <span className="font-medium text-[#fdfdfd]">Michael Schmidt</span>
          </p>

          {/* Hero image placeholder */}
          <div className="w-full aspect-video bg-[#1a1a1a] rounded-lg mb-8 flex items-center justify-center">
            <span className="text-[#aaaaaa] text-sm">Match Preview Image</span>
          </div>

          {/* Article body */}
          <article className="prose prose-sm max-w-none text-[#aaaaaa] space-y-4">
            <p>
              Bayern M&uuml;nchen head into Matchday 28 in imperious form, having won seven of their
              last eight Bundesliga fixtures. Vincent Kompany&rsquo;s side have been ruthless in front
              of goal, netting 22 times in that run, with Harry Kane leading the charge on 28 league
              goals for the season. Their pressing game has been particularly effective at the Allianz
              Arena, where they remain unbeaten this campaign. With the title race entering its final
              stretch, Bayern know that three points on Saturday would all but confirm them as champions.
            </p>

            <p>
              Borussia Dortmund, however, arrive in Munich dealing with a growing injury list. Midfielder
              Marcel Sabitzer is doubtful after picking up a knock in training, while centre-back Nico
              Schlotterbeck is expected to miss out with a hamstring strain sustained during the midweek
              cup tie. Nuri Sahin has experimented with a 3-4-2-1 formation in recent weeks to compensate
              for defensive absences, but the system remains a work in progress. On the bright side,
              Karim Adeyemi has returned to full fitness and could provide a spark on the counter.
            </p>

            <p>
              Tactically, the key battle will be fought in midfield. Joshua Kimmich has been exceptional
              in recent weeks, dictating tempo and contributing three assists in his last four appearances.
              Dortmund will need Emre Can and Julian Brandt to disrupt Bayern&rsquo;s build-up play and
              transition quickly. History favors the hosts &mdash; Bayern have won eight of the last ten
              Der Klassiker meetings &mdash; but Dortmund&rsquo;s record of snatching results at the
              Allianz Arena means this fixture is never as straightforward as the odds suggest.
            </p>
          </article>

          {/* Pull quote */}
          <blockquote className="border-l-4 border-[#ff6b00] pl-4 my-8 py-2">
            <p className="italic text-[#aaaaaa]">
              &ldquo;We respect Dortmund, but at home we set the standard. The players are focused and
              hungry &mdash; this is a match we want to dominate from the first whistle.&rdquo;
            </p>
            <cite className="text-xs text-[#666666] not-italic mt-2 block">
              &mdash; Vincent Kompany, Bayern M&uuml;nchen Head Coach
            </cite>
          </blockquote>
        </main>

        {/* Sidebar */}
        <aside className="w-72 shrink-0 space-y-6 mt-0">
          {/* Odds table */}
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden">
            <div className="bg-[#ff6b00] text-white px-4 py-2 flex items-center justify-between">
              <span className="text-sm font-semibold">Betting Odds</span>
              <span className="text-xs text-white/70">Tipico</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#666666] text-xs">
                  <th className="text-left px-4 py-2 font-medium">Outcome</th>
                  <th className="text-right px-4 py-2 font-medium">Odds</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2.5 font-medium text-[#aaaaaa]">Bayern M&uuml;nchen</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#ff6b00]">1.85</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-2.5 font-medium text-[#aaaaaa]">Draw</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-[#666666]">3.60</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-[#aaaaaa]">BVB</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-amber-500">4.20</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ad placeholder */}
          {adActivated && isVision ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a1a1a] rounded-lg border-2 border-[#ff6b00]/30 overflow-hidden ring-2 ring-[#ff6b00]/20"
            >
              <div className="bg-gradient-to-r from-[#cc5500] to-[#b34a00] text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">For You</span>
              </div>
              <div className="p-5 flex flex-col items-center">
                <p className="text-xs text-[#ff6b00] font-semibold uppercase tracking-wide mb-2">Carlos, your combi bet is ready</p>
                <p className="font-bold text-[#fdfdfd] text-lg">{'\u{1F534}\u{26AB}'} Flamengo Combi</p>
                <p className="text-xs text-[#666666] mt-1">Brasileir&atilde;o &mdash; Flamengo vs Palmeiras</p>
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm bg-[#ff6b00]/10 rounded-lg px-3 py-2">
                    <span className="text-[#aaaaaa]">Flamengo to win</span>
                    <span className="font-bold text-[#ff6b00]">1.75</span>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-[#ff6b00]/10 rounded-lg px-3 py-2">
                    <span className="text-[#aaaaaa]">Over 2.5 goals</span>
                    <span className="font-bold text-[#ff6b00]">1.90</span>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-[#ff6b00]/10 rounded-lg px-3 py-2">
                    <span className="text-[#aaaaaa]">Both teams score</span>
                    <span className="font-bold text-[#ff6b00]">1.65</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-[#666666]">Combined odds</p>
                  <p className="text-2xl font-extrabold text-[#ff6b00]">5.49</p>
                </div>
                <button className="mt-3 w-full bg-gradient-to-r from-[#ff6b00] to-[#cc5500] text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                  Place Combi Bet &rarr;
                </button>
                <p className="text-[10px] text-[#666666] mt-2">18+ | T&Cs apply</p>
              </div>
            </motion.div>
          ) : adActivated && isGameWon ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden"
              style={{ aspectRatio: '300/250' }}
            >
              <div className="bg-[#161616] text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">Sponsored</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center h-[calc(100%-40px)]">
                <p className="text-xs text-[#666666] uppercase tracking-wide mb-2">Bundesliga Matchday 29</p>
                <p className="font-bold text-[#fdfdfd] text-lg">Bayern vs Leipzig</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="text-center">
                    <span className="text-xs text-[#666666] block">1</span>
                    <span className="text-lg font-bold text-[#ff6b00]">1.70</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#666666] block">X</span>
                    <span className="text-lg font-bold text-[#666666]">3.80</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#666666] block">2</span>
                    <span className="text-lg font-bold text-amber-500">4.50</span>
                  </div>
                </div>
                <button className="mt-3 bg-[#ff6b00] text-white text-xs font-semibold px-6 py-2 rounded-lg hover:bg-[#e06000] transition-colors">
                  Bet Now &rarr;
                </button>
                <p className="text-[10px] text-[#666666] mt-2">18+ | T&Cs apply</p>
              </div>
            </motion.div>
          ) : adActivated ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden"
              style={{ aspectRatio: '300/250' }}
            >
              <div className="bg-[#161616] text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">Sponsored</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center h-[calc(100%-40px)]">
                <p className="text-xs text-[#666666] uppercase tracking-wide mb-2">Bundesliga Matchday 28</p>
                <p className="font-bold text-[#fdfdfd] text-lg">Bayern vs Dortmund</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="text-center">
                    <span className="text-xs text-[#666666] block">1</span>
                    <span className="text-lg font-bold text-[#ff6b00]">1.85</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#666666] block">X</span>
                    <span className="text-lg font-bold text-[#666666]">3.60</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-[#666666] block">2</span>
                    <span className="text-lg font-bold text-amber-500">4.20</span>
                  </div>
                </div>
                <button className="mt-3 bg-[#ff6b00] text-white text-xs font-semibold px-6 py-2 rounded-lg hover:bg-[#e06000] transition-colors">
                  Bet Now &rarr;
                </button>
                <p className="text-[10px] text-[#666666] mt-2">18+ | T&Cs apply</p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden" style={{ aspectRatio: '300/250' }}>
              <div className="bg-[#161616] text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">Ad</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center h-[calc(100%-40px)]">
                <p className="text-xs text-[#666666] uppercase tracking-wide mb-1">Limited Offer</p>
                <p className="font-bold text-[#fdfdfd] text-base">Open Account Offer</p>
                <p className="text-[#ff6b00] font-bold text-lg mt-1">Bet &euro;10 Get &euro;30</p>
                <p className="text-xs text-[#666666] mt-1">in Free Bets</p>
                <button className="mt-3 bg-[#ff6b00] text-white text-xs font-semibold px-6 py-2 rounded-lg">
                  Join Now &rarr;
                </button>
                <p className="text-[10px] text-[#666666] mt-2">18+ | T&Cs apply | New customers only</p>
              </div>
            </div>
          )}

          {/* Related Articles */}
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-4">
            <h3 className="text-sm font-semibold text-[#fdfdfd] mb-3">Related Articles</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-[#ff6b00] hover:underline leading-snug block">
                  Kane breaks Lewandowski&rsquo;s single-season record
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#ff6b00] hover:underline leading-snug block">
                  Schlotterbeck injury update: Sahin confirms weeks out
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#ff6b00] hover:underline leading-snug block">
                  Bundesliga title race: What each contender needs
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
