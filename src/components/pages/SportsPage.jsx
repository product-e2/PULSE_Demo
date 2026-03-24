import { useDemo } from '../../state/DemoContext';
import { useTenant } from '../../tenants/TenantContext';
import { motion } from 'framer-motion';

export default function SportsPage() {
  const { state } = useDemo();
  const { tenant } = useTenant();
  const { adActivated, currentAct } = state;
  const isVision = currentAct === 4;
  const isGameWon = currentAct === 3;
  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <header className={`${tenant.sports.headerBg} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-8">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight" style={{ color: tenant.sports.logoAccent }}>{tenant.sports.logo}</span>
            <span className={`h-0.5 w-full ${tenant.sports.logoUnderline} rounded`} />
          </div>
          <nav className="flex items-center gap-4 text-sm text-gray-300">
            {tenant.sports.navItems.map((item, i) => (
              <span key={item}>
                {i > 0 && <span className="text-gray-600 mr-4">|</span>}
                <span className="hover:text-white cursor-pointer">{item}</span>
              </span>
            ))}
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-2">
        <p className="text-xs text-gray-500">
          Home &gt; Bundesliga &gt; Bayern vs Dortmund
        </p>
      </div>

      {/* Article area */}
      <div className="max-w-7xl mx-auto px-4 pb-12 flex gap-8">
        {/* Main column */}
        <main className="flex-1 min-w-0">
          {/* Hero */}
          <div className={`relative rounded-lg overflow-hidden bg-gradient-to-r ${tenant.sports.heroGradient} h-64 flex flex-col justify-end p-6`}>
            <span className={`absolute top-4 left-4 ${tenant.sports.tagBg} ${tenant.sports.tagText} text-xs font-bold uppercase tracking-wider px-3 py-1 rounded`}>
              Match Preview
            </span>
            <h1 className="text-3xl font-extrabold text-white leading-tight drop-shadow">
              Bayern M&uuml;nchen vs Borussia Dortmund
            </h1>
            <p className="text-white/90 text-sm mt-1">
              Bundesliga Matchday 28 &mdash; Saturday, March 22
            </p>
          </div>

          {/* Author line */}
          <p className="text-xs text-gray-500 mt-4 mb-6">
            By <span className="font-medium text-gray-700">Michael Schmidt</span> | March 20, 2026 | 3 min read
          </p>

          {/* Article body */}
          <article className="prose prose-sm max-w-none text-gray-700 space-y-4">
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
          <blockquote className={`border-l-4 ${tenant.sports.blockquoteBorder} pl-4 my-8 py-2`}>
            <p className="italic text-gray-600">
              &ldquo;We respect Dortmund, but at home we set the standard. The players are focused and
              hungry &mdash; this is a match we want to dominate from the first whistle.&rdquo;
            </p>
            <cite className="text-xs text-gray-500 not-italic mt-2 block">
              &mdash; Vincent Kompany, Bayern M&uuml;nchen Head Coach
            </cite>
          </blockquote>
        </main>

        {/* Sidebar */}
        <aside className="w-72 shrink-0 space-y-6 mt-0">
          {/* Odds table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
              <span className="text-sm font-semibold">Betting Odds</span>
              <span className="text-xs text-gray-400">Tipico</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-xs">
                  <th className="text-left px-4 py-2 font-medium">Outcome</th>
                  <th className="text-right px-4 py-2 font-medium">Odds</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="px-4 py-2.5 font-medium text-gray-700">Bayern M&uuml;nchen</td>
                  <td className={`px-4 py-2.5 text-right font-semibold ${tenant.sports.oddsHighlight}`}>1.85</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-4 py-2.5 font-medium text-gray-700">Draw</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-gray-600">3.60</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-medium text-gray-700">BVB</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-amber-600">4.20</td>
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
              className="bg-white rounded-lg shadow-md border-2 border-red-500/30 overflow-hidden ring-2 ring-red-400/20"
            >
              <div className="bg-gradient-to-r from-red-700 to-red-900 text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">For You</span>
              </div>
              <div className="p-5 flex flex-col items-center">
                <p className="text-xs text-red-600 font-semibold uppercase tracking-wide mb-2">Carlos, your combi bet is ready</p>
                <p className="font-bold text-gray-900 text-lg">Flamengo Combi</p>
                <p className="text-xs text-gray-500 mt-1">Brasileir&atilde;o — Flamengo vs Palmeiras</p>
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm bg-red-50 rounded-lg px-3 py-2">
                    <span className="text-gray-700">Flamengo to win</span>
                    <span className="font-bold text-red-700">1.75</span>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-red-50 rounded-lg px-3 py-2">
                    <span className="text-gray-700">Over 2.5 goals</span>
                    <span className="font-bold text-red-700">1.90</span>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-red-50 rounded-lg px-3 py-2">
                    <span className="text-gray-700">Both teams score</span>
                    <span className="font-bold text-red-700">1.65</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Combined odds</p>
                  <p className="text-2xl font-extrabold text-red-700">5.49</p>
                </div>
                <button className="mt-3 w-full bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                  Place Combi Bet
                </button>
                <p className="text-[10px] text-gray-400 mt-2">18+ | T&Cs apply</p>
              </div>
            </motion.div>
          ) : adActivated && isGameWon ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              style={{ aspectRatio: '300/250' }}
            >
              <div className="bg-[#1a365d] text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">Sponsored</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center h-[calc(100%-40px)]">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Bundesliga Matchday 29</p>
                <p className="font-bold text-gray-900 text-lg">Bayern vs Leipzig</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">1</span>
                    <span className="text-lg font-bold text-[#1a365d]">1.70</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">X</span>
                    <span className="text-lg font-bold text-gray-600">3.80</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">2</span>
                    <span className="text-lg font-bold text-amber-600">4.50</span>
                  </div>
                </div>
                <button className="mt-3 bg-[#1a365d] text-white text-xs font-semibold px-6 py-2 rounded-lg hover:bg-[#2a4a7d] transition-colors">
                  Bet Now
                </button>
                <p className="text-[10px] text-gray-400 mt-2">18+ | T&Cs apply</p>
              </div>
            </motion.div>
          ) : adActivated ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              style={{ aspectRatio: '300/250' }}
            >
              <div className="bg-[#1a365d] text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">Sponsored</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center h-[calc(100%-40px)]">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Bundesliga Matchday 28</p>
                <p className="font-bold text-gray-900 text-lg">Bayern vs Dortmund</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">1</span>
                    <span className="text-lg font-bold text-[#1a365d]">1.85</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">X</span>
                    <span className="text-lg font-bold text-gray-600">3.60</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 block">2</span>
                    <span className="text-lg font-bold text-amber-600">4.20</span>
                  </div>
                </div>
                <button className="mt-3 bg-[#1a365d] text-white text-xs font-semibold px-6 py-2 rounded-lg hover:bg-[#2a4a7d] transition-colors">
                  Bet Now
                </button>
                <p className="text-[10px] text-gray-400 mt-2">18+ | T&Cs apply</p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ aspectRatio: '300/250' }}>
              <div className="bg-[#1a365d] text-white px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-bold">Tipico</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">Ad</span>
              </div>
              <div className="p-4 flex flex-col items-center justify-center h-[calc(100%-40px)]">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Limited Offer</p>
                <p className="font-bold text-gray-900 text-base">Open Account Offer</p>
                <p className="text-[#1a365d] font-bold text-lg mt-1">Bet $10 Get $30</p>
                <p className="text-xs text-gray-500 mt-1">in Free Bets</p>
                <button className="mt-3 bg-[#1a365d] text-white text-xs font-semibold px-6 py-2 rounded-lg">
                  Join Now
                </button>
                <p className="text-[10px] text-gray-400 mt-2">18+ | T&Cs apply | New customers only</p>
              </div>
            </div>
          )}

          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Related Articles</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-blue-700 hover:underline leading-snug block">
                  Kane breaks Lewandowski&rsquo;s single-season record
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-700 hover:underline leading-snug block">
                  Schlotterbeck injury update: Sahin confirms weeks out
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-700 hover:underline leading-snug block">
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
