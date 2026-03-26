import { useQuery } from "@tanstack/react-query";
import { fetchClubData } from "../services/api";
import { projects as localProjects } from "../data/mockData";
import { logger } from "../utils/logger";

export function useProjects() {
  const query = useQuery({
    queryKey: ["clubData"],
    queryFn: fetchClubData,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 2,
    refetchOnWindowFocus: false,
    select: (data) => data?.projects ?? localProjects,
    placeholderData: { projects: localProjects },
  });
  const loading = query.isLoading && !query.data;
  if (query.error)
    logger.warn("useProjects.error", { error: query.error?.message });
  return {
    projects: query.data ?? localProjects,
    loading,
    error: query.error?.message || null,
  };
}
