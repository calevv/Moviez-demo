import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchGenre = () => {
    return api.get(`/genre/movie/list?language=ko-KR`);
};

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetchGenre,
        select: (reault) => reault.data.genres,
        suspense: true,
        staleTime: 30000,
    });
};
