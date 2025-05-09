import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieReviews = ({ id }) => {
    return api.get(`/movie/${id}/reviews`); //?language=ko-KR
};

export const useMovieReviewsQuery = ({ id }) => {
    return useQuery({
        queryKey: ['movie-reviews', id],
        queryFn: () => fetchMovieReviews({ id }),
        suspense: true,
        select: (reault) => reault.data,
    });
};
