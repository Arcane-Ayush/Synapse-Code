import { logger } from "../utils/logger";
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://gist.githubusercontent.com/Arcane-Ayush/72f1be6cea09ed7385a5f44076af9ef4/raw/clubData.json";

export async function fetchClubData() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  const url = `${BASE_URL}`;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const err = { code: res.status, message: "Failed to fetch data" };
      logger.error("api.fetchClubData", err);
      throw new Error(`${err.message}: ${err.code}`);
    }
    const json = await res.json();
    logger.info("api.fetchClubData.success");
    return json;
  } catch (e) {
    clearTimeout(timeout);
    logger.error("api.fetchClubData.error", { error: String(e) });
    throw e;
  }
}
