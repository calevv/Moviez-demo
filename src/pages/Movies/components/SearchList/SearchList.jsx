import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Button, Container, Grid } from "@mui/material";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import CircularProgress from "@mui/material/CircularProgress";
import useFilterStore from "../../../../stores/useFilterStore";
import { useSearchMoviesQuery } from "../../../../hooks/useSearchMovies";
import _ from "lodash";

const SearchList = ({ keyword }) => {
  const navigate = useNavigate();
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
  }, [keyword]);
  const { data, error, isError, isLoading } = useSearchMoviesQuery({
    keyword,
    page,
  });

  if (isLoading) {
    return (
      <Container
        sx={{
          display: "flex",
          marginTop: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="3rem" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Alert key="danger" variant="danger">
        {error?.message || "검색 정보를 불러오는 중 오류가 발생했습니다."}
      </Alert>
    );
  }
  console.log("datadata", data);
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const filteredMovies = selectedGenre
    ? data?.results?.filter((item) =>
        item.genre_ids?.includes(selectedGenre.id)
      )
    : data?.results;

const sortedMovies = useMemo(() => { 
  const sortedPopular = (movies, sortBy) => { 
    let sorted = movies;
    if (sortBy === "popularity.desc") {
      sorted = _.orderBy(movies, ["popularity"], ["desc"]);
    } else if (sortBy === "popularity.asc") {
      sorted = _.orderBy(movies, ["popularity"], ["asc"]);
    } 
    return sorted;
  };
  const result = sortedPopular(filteredMovies, selectedPopular); 
  return result;
}, [filteredMovies, selectedPopular]);

  //console.log("asc", sortedMovies);
  return (
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
        pageCount={
          selectedGenre
            ? Math.ceil(
                (filteredMovies?.length || 0) /
                  (data?.results?.length > 0 ? data.results.length : 20)
              )
            : data?.total_pages
        } // 전체페이지
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
  );
};

export default SearchList;
