import { onCLS, onLCP, onTTFB, onINP } from "web-vitals";
import { logger } from "./logger";

export function reportWebVitals() {
  onCLS((v) => logger.info("web-vitals.CLS", v));
  onLCP((v) => logger.info("web-vitals.LCP", v));
  onTTFB((v) => logger.info("web-vitals.TTFB", v));
  onINP((v) => logger.info("web-vitals.INP", v));
}
