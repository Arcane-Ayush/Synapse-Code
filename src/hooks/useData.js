import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    activities as localActivities,
    projects as localProjects,
    leaderboard as localLeaderboard,
    currentSprint as localSprint
} from '../data/mockData';
import { fetchClubData } from '../services/api';

export function useData() {
    const query = useQuery({
        queryKey: ['clubData'],
        queryFn: fetchClubData,
        staleTime: 1000 * 60 * 10, // 10 min
        gcTime: 1000 * 60 * 60,    // 1 hour
        retry: 2,
        refetchOnWindowFocus: false,
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

    return { ...merged, loading: query.isLoading, error: query.error?.message || null };
}
