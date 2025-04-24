import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieReco = ({ id }) => {
    return api.get(`/movie/${id}/recommendations?language=ko-KR`);
};

export const useMovieRecoQuery = ({ id }) => {
    return useQuery({
        queryKey: ['movie-reco', id],
        queryFn: () => fetchMovieReco({ id }),
        suspense: true,
        select: (reault) => reault.data,
    });
};
