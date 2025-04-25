import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Button, Container, Grid } from "@mui/material";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import CircularProgress from "@mui/material/CircularProgress";
import useFilterStore from "../../../../stores/useFilterStore";
import { useSearchMoviesQuery } from "../../../../hooks/useSearchMovies";

const SearchList = ({ keyword }) => {
  const navigate = useNavigate();

  const [sortedMovies, setSortedMovies] = useState(null);
  const [page, setPage] = useState(1);

  const {
    selectedGenre,
    setSelectedGenre,
    setSelectedPopular,
    selectedPopular,
  } = useFilterStore();

  useEffect(() => {
    setPage(1);
    setSelectedGenre(null);
    setSelectedPopular("");
  }, [keyword, setSelectedGenre, setSelectedPopular]);

  const { data, error, isError, isLoading } = useSearchMoviesQuery({
    keyword,
    page,
  });

  // filteredMovies를 useMemo로 계산해서 불필요한 재계산 방지
  const filteredMovies = useMemo(() => {
    if (!data?.results) return [];

    return selectedGenre
      ? data.results.filter((item) =>
          item.genre_ids?.includes(selectedGenre.id)
        )
      : data.results;
  }, [data?.results, selectedGenre]);

  // 정렬된 영화 목록 계산
  useEffect(() => {
    if (!filteredMovies.length) {
      setSortedMovies([]);
      return;
    }

    let newSortedMovies = [...filteredMovies];

    if (selectedPopular === "popularity.desc") {
      newSortedMovies.sort((a, b) => b.popularity - a.popularity);
    } else if (selectedPopular === "popularity.asc") {
      newSortedMovies.sort((a, b) => a.popularity - b.popularity);
    }

    setSortedMovies(newSortedMovies);
  }, [filteredMovies, selectedPopular]);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (isError) {
    return (
      <Alert key="danger" variant="danger">
        {error?.message || "검색 정보를 불러오는 중 오류가 발생했습니다."}
      </Alert>
    );
  }

  const pageCount = selectedGenre
    ? Math.ceil(
        (sortedMovies?.length || 0) /
          (data?.results?.length > 0 ? data.results.length : 20)
      )
    : data?.total_pages || 0;
  return (
    <div>
      <Container sx={{ padding: "20px" }}>
        {sortedMovies?.length > 0 ? (
          <Grid container spacing={2}>
            {sortedMovies?.map((movie) => (
              <Grid size={{ xs: 6, md: 3 }}>
                <MovieCard key={movie.id} movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div>
            <Alert
              key="danger"
              variant="danger"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              검색 결과가 없습니다.
              <Button
                color="secondary"
                variant="contained"
                onClick={() => navigate(-1)}
              >
                돌아가기
              </Button>
            </Alert>
          </div>
        )}
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          pageCount={pageCount} // 전체페이지
          forcePage={page - 1} //선택페이지
          previousLabel="<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </Container>
    </div>
  );
};

export default SearchList;
