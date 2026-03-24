import { motion, AnimatePresence } from "framer-motion";
import { useTenant } from "../../tenants/TenantContext";

const featurePills = ["Zero config", "Auto-detection", "Multi-market", "CPA tracking"];

export default function EmbedCodeOverlay({ visible = true }) {
  const { tenant } = useTenant();
  const accentColor = tenant.pulse?.accentColor || '#a855f7';
  const publisher = tenant.embed?.publisher || 'kicker';
  const geo = tenant.embed?.geo || 'DE';

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
            <span
              className="inline-block text-xs px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: `${accentColor}33`, color: accentColor }}
            >
              Integration
            </span>

            {/* Title */}
            <h2 className="text-3xl font-bold text-white leading-tight mb-6">
              One line of code.
              <br />
              <span style={{ color: accentColor }}>That's it.</span>
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
                <span style={{ color: accentColor }}>src</span>
                <span className="text-gray-400">{"="}</span>
                <span className="text-emerald-400">{'"https://pulse.e2.at/widget.js"'}</span>
              </div>

              {/*         data-publisher="..." */}
              <div className="pl-12">
                <span style={{ color: accentColor }}>data-publisher</span>
                <span className="text-gray-400">{"="}</span>
                <span className="text-emerald-400">{`"${publisher}"`}</span>
              </div>

              {/*         data-geo="..."> */}
              <div className="pl-12">
                <span style={{ color: accentColor }}>data-geo</span>
                <span className="text-gray-400">{"="}</span>
                <span className="text-emerald-400">{`"${geo}"`}</span>
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
