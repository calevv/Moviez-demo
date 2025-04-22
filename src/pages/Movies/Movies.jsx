import React from "react";
import { useSearchMoviesQuery } from "../../hooks/useSearchMovies";
import { useSearchParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Container, Grid } from "@mui/material";
import MovieCard from "../../common/MovieCard/MovieCard";
//import styles from './Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");
  const { data, error, isError, isLoading } = useSearchMoviesQuery({ keyword });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return (
      <Alert key="danger" variant="danger">
        {error?.message || "검색 정보를 불러오는 중 오류가 발생했습니다."}
      </Alert>
    );
  }
  console.log("datadata", data);
  return (
    <div>
      <Container sx={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {data?.results.map((movie) => (
            <Grid size={{ xs: 6, md: 3 }}>
              <MovieCard key={movie.id} movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Movies;
