import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchNowMovies = () => {
    return api.get(`/movie/now_playing?language=ko-KR`);
};

export const useNowMoviesQuery = () => {
    return useQuery({
        queryKey: ['now-playing'],
        queryFn: fetchNowMovies,
        select: (reault) => reault.data,
    });
};
