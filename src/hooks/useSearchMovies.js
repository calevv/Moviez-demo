import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearch = ({ keyword, page }) => {
    return keyword
        ? api.get(`/search/movie?query=${keyword}&page=${page}&language=ko-KR`)
        : api.get(`/movie/popular?language=ko-KR&page=${page}`);
};

export const useSearchMoviesQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, page],
        queryFn: () => fetchSearch({ keyword, page }),
        select: (reault) => reault.data,
    });
};
