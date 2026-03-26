import { useQuery } from "@tanstack/react-query";
import { fetchClubData } from "../services/api";
import { activities as localActivities } from "../data/mockData";
import { logger } from "../utils/logger";

export function useActivities() {
  const query = useQuery({
    queryKey: ["clubData"],
    queryFn: fetchClubData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
    select: (data) => data?.activities ?? localActivities,
    placeholderData: { activities: localActivities },
  });
  const loading = query.isLoading && !query.data;
  if (query.error)
    logger.warn("useActivities.error", { error: query.error?.message });
  return {
    activities: query.data ?? localActivities,
    loading,
    error: query.error?.message || null,
  };
}
