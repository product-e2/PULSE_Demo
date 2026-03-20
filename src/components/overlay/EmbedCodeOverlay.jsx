import { motion, AnimatePresence } from "framer-motion";

const featurePills = ["Zero config", "Auto-detection", "Multi-market", "CPA tracking"];

export default function EmbedCodeOverlay({ visible = true }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="embed-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.15 }}
            className="bg-gray-900/95 rounded-2xl p-8 max-w-lg border border-white/10 shadow-2xl"
          >
            {/* Pill label */}
            <span className="inline-block bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full mb-4">
              Integration
            </span>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white leading-tight mb-6">
              One line of code.
              <br />
              <span className="text-purple-400">That's it.</span>
            </h2>

            {/* Code block */}
            <div className="bg-black/60 rounded-xl p-6 font-mono text-sm border border-white/5 leading-relaxed overflow-x-auto">
              {/* <!-- PULSE by E2 — that's it. --> */}
              <div>
                <span className="text-gray-500">{"<!-- PULSE by E2 \u2014 that\u2019s it. -->"}</span>
              </div>

              {/* <script src="..." */}
              <div>
                <span className="text-gray-400">{"<"}</span>
                <span className="text-sky-400">script</span>
                <span className="text-gray-400">{" "}</span>
                <span className="text-purple-400">src</span>
                <span className="text-gray-400">{"="}</span>
                <span className="text-emerald-400">{'"https://pulse.e2.at/widget.js"'}</span>
              </div>

              {/*         data-publisher="kicker" */}
              <div className="pl-12">
                <span className="text-purple-400">data-publisher</span>
                <span className="text-gray-400">{"="}</span>
                <span className="text-emerald-400">{'"kicker"'}</span>
              </div>

              {/*         data-geo="DE"> */}
              <div className="pl-12">
                <span className="text-purple-400">data-geo</span>
                <span className="text-gray-400">{"="}</span>
                <span className="text-emerald-400">{'"DE"'}</span>
                <span className="text-gray-400">{">"}</span>
              </div>

              {/* </script> */}
              <div>
                <span className="text-gray-400">{"</"}</span>
                <span className="text-sky-400">script</span>
                <span className="text-gray-400">{">"}</span>
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {featurePills.map((label) => (
                <span
                  key={label}
                  className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full"
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
