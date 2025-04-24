import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReco = ({ id, page }) => {
  return api.get(`/movie/${id}/recommendations?language=ko-KR&page=${page}`);
};

export const useMovieRecoQuery = ({ id, page }) => {
  return useQuery({
    queryKey: ["movie-reco", id, page],
    queryFn: () => fetchMovieReco({ id, page }),
    select: (reault) => reault.data,
  });
};
