import React from "react";
import "./MovieCard.style.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import GradeIcon from "@mui/icons-material/Grade";

const MovieCard = ({ movie, index }) => {
  const navigate = useNavigate();

  const { data: genreData, isLoading } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreIdList || isLoading) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObject = genreData.find((genre) => genre?.id === id);
      return genreObject;
    });
    return genreNameList;
  };

  function handleImageError(event) {
    event.target.onerror = null; // 무한 루프 방지
    event.target.style.display = "none"; // 이미지 숨기기
    const parentDiv = event.target.parentNode;
    parentDiv.innerHTML = `
      <div
          style={{ fontSize: "1.5rem", display: "flex", alignItems: "center" }}
          className="movieCard"
          data-index={typeof index !== "undefined" ? index + 1 : ""}
        >
          {" "}
          {movie?.title}
        </div>
    `; // 대체 UI 표시
  }
  return (
    <div className="cardBox" onClick={() => navigate(`/movies/${movie?.id}`)}>
      {movie?.poster_path || movie?.poster_path !== null ? (
        <div
          className="movieCard"
          data-index={typeof index !== "undefined" ? index + 1 : ""}
          onError={handleImageError}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.poster_path})`,
          }}
        ></div>
      ) : (
        <div
          style={{ fontSize: "1.5rem", display: "flex", alignItems: "center" }}
          className="movieCard"
          data-index={typeof index !== "undefined" ? index + 1 : ""}
        >
          {" "}
          {movie?.title}
        </div>
      )}
      <Card className="movieCard_modal">
        {movie?.backdrop_path || movie?.backdrop_path !== null ? (
          <CardMedia
            component="img"
            alt={movie?.title}
            onError={handleImageError}
            height="30%"
            image={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          />
        ) : (
          <div
            style={{ height: "30%", width: "100%", backgroundColor: "white" }}
          >
            {" "}
          </div>
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="modalTitle"
          >
            {movie?.title}
          </Typography>
          <Typography
            component="div" // 또는 "nav" 등
            variant="body2"
            sx={{ color: "text.secondary" }}
            style={{ display: "flex" }}
          >
            <ul>
              {movie?.genre_ids &&
                showGenre(movie.genre_ids)
                  .slice(0, 2)
                  .map((item) => <li key={item.id}>{item.name}</li>)}
              {movie?.genre_ids && showGenre(movie.genre_ids).length > 2 && (
                <li style={{ background: "none" }}>...</li>
              )}
            </ul>
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{
              color: "text.secondary",
              gap: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <GradeIcon />
            {movie.vote_average.toFixed(1)}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
};

export default MovieCard;
