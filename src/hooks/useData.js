import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { logger } from "../utils/logger";
import {
  activities as localActivities,
  projects as localProjects,
  leaderboard as localLeaderboard,
  currentSprint as localSprint,
} from "../data/mockData";
import { fetchClubData } from "../services/api";

export function useData() {
  const query = useQuery({
    queryKey: ["clubData"],
    queryFn: fetchClubData,
    staleTime: 1000 * 60 * 10, // 10 min
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
    placeholderData: {
      activities: localActivities,
      projects: localProjects,
      leaderboard: localLeaderboard,
      currentSprint: localSprint,
    },
  });

  const merged = useMemo(() => {
    const data = query.data || {};
    return {
      activities: data.activities || localActivities,
      projects: data.projects || localProjects,
      leaderboard: data.leaderboard || localLeaderboard,
      currentSprint: data.currentSprint || localSprint,
    };
  }, [query.data]);

  // Only show "loading" UI if we truly have no data yet
  const loading = query.isLoading && !query.data;
  if (query.error)
    logger.warn("useData.error", { error: query.error?.message });
  return { ...merged, loading, error: query.error?.message || null };
}
