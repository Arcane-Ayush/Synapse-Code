import { useQuery } from "@tanstack/react-query";
import { fetchClubData } from "../services/api";
import {
  leaderboard as localLeaderboard,
  currentSprint as localSprint,
} from "../data/mockData";
import { logger } from "../utils/logger";

export function useSprints() {
  const query = useQuery({
    queryKey: ["clubData"],
    queryFn: fetchClubData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
    select: (data) => ({
      leaderboard: data?.leaderboard ?? localLeaderboard,
      currentSprint: data?.currentSprint ?? localSprint,
    }),
    placeholderData: {
      leaderboard: localLeaderboard,
      currentSprint: localSprint,
    },
  });
  const data = query.data ?? {
    leaderboard: localLeaderboard,
    currentSprint: localSprint,
  };
  const loading = query.isLoading && !query.data;
  if (query.error)
    logger.warn("useSprints.error", { error: query.error?.message });
  return { ...data, loading, error: query.error?.message || null };
}
