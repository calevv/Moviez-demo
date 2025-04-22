import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearch = ({ keyword }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&language=ko-KR`)
    : api.get(`/movie/popular?language=ko-KR`);
};

export const useSearchMoviesQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ["movie-search", keyword],
    queryFn: () => fetchSearch({ keyword }),
    select: (reault) => reault.data,
  });
};
