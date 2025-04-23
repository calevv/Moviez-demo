import React from "react";
import "./MovieCard.style.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
const MovieCard = ({ movie, index }) => {
  const navigate = useNavigate();

  const { data: genreData, isLoading } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreIdList || isLoading) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObject = genreData.find((genre) => genre?.id === id);
      return genreObject.name;
    });
    return genreNameList;
  };
  return (
    <div className="cardBox">
      {movie?.poster_path ? (
        <div
          className="movieCard"
          data-index={typeof index !== "undefined" ? index + 1 : ""}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie?.poster_path})`,
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
        {movie?.backdrop_path ? (
          <CardMedia
            component="img"
            alt={movie?.title}
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
            variant="body2"
            sx={{ color: "text.secondary" }}
            style={{ display: "flex" }}
          >
            <ul>
              {showGenre(movie?.genre_ids).map((item) => (
                <li>{item}</li>
              ))}{" "}
            </ul>
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {movie.vote_average}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/movies/${movie?.id}`)}>
            보러가기
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default MovieCard;
