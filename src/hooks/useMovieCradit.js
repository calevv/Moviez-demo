import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieCradit = ({ id }) => {
  return api.get(`/movie/${id}/credits?language=ko-KR`);
};

export const useMovieCraditQuery = ({ id }) => {
  return useQuery({
    queryKey: ["movie-cradit", id],
    queryFn: () => fetchMovieCradit({ id }),
    select: (reault) => reault.data,
  });
};
