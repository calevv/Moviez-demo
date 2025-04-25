import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import "./Movies.style.css";
import FilterBox from "./components/FilterBox/FilterBox";
import SearchList from "./components/SearchList/SearchList";

import { CircularProgress, Container } from "@mui/material";
import FilterList from "./components/FilterList/FilterList";

const Movies = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");

  return (
    <Suspense
      fallback={
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
      }
    >
      <Container className="moviesContainer">
        <FilterBox />
        {keyword ? <SearchList keyword={keyword} /> : <FilterList />}
      </Container>
    </Suspense>
  );
};

export default Movies;
