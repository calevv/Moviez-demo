import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearch = ({ keyword, page, genreId, popularValue }) => {
    return keyword
        ? api.get(`/search/movie?query=${keyword}&page=${page}&language=ko-KR`)
        : api.get(`/discover/movie?language=ko-KR&page=${page}&with_genres=${genreId}&sort_by=${popularValue}`);
};

export const useSearchMoviesQuery = ({ keyword, page, genreId, popularValue }) => {
    return useQuery({
        queryKey: ['movie-search', keyword, page, genreId, popularValue],
        queryFn: () => fetchSearch({ keyword, page, genreId, popularValue }),
        suspense: true,
        select: (reault) => reault.data,
    });
};
