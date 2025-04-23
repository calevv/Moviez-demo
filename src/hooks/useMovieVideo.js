import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieVideo = ({ id }) => {
    return api.get(`/movie/${id}/videos?language=ko-KR`);
};

export const useMovieVideoQuery = ({ id }) => {
    return useQuery({
        queryKey: ['movie-video', id],
        queryFn: () => fetchMovieVideo({ id }),
        select: (reault) => reault.data,
    });
};
