const levels = { debug: 0, info: 1, warn: 2, error: 3 };
function getEnvLogLevel() {
  try {
    return import.meta?.env?.VITE_LOG_LEVEL;
  } catch {
    return undefined;
  }
}
let envLevel = String(getEnvLogLevel() || "info").toLowerCase();
let threshold = levels[envLevel] ?? levels.info;

function format(meta) {
  try {
    return JSON.stringify(meta);
  } catch {
    return String(meta);
  }
}

export const logger = {
  debug(msg, meta) {
    if (threshold <= levels.debug) console.debug(msg, meta ? format(meta) : "");
  },
  info(msg, meta) {
    if (threshold <= levels.info) console.info(msg, meta ? format(meta) : "");
  },
  warn(msg, meta) {
    if (threshold <= levels.warn) console.warn(msg, meta ? format(meta) : "");
  },
  error(msg, meta) {
    if (threshold <= levels.error) console.error(msg, meta ? format(meta) : "");
  },
};

export function setLogLevel(level) {
  if (typeof level !== "string") return;
  const lv = level.toLowerCase();
  if (lv in levels) {
    threshold = levels[lv];
  }
}
