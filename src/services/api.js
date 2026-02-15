const BASE_URL = import.meta.env.VITE_API_URL || "https://gist.githubusercontent.com/Arcane-Ayush/72f1be6cea09ed7385a5f44076af9ef4/raw/clubData.json";

export async function fetchClubData() {
  const url = `${BASE_URL}`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
  return res.json();
}
