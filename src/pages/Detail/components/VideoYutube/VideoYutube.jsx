import React from "react";
import { Alert } from "react-bootstrap";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import YouTube from "react-youtube";
import styles from "./VideoYutube.module.css";
import { useMovieVideoQuery } from "../../../../hooks/useMovieVideo";
const VideoYutube = ({ id, posterUrl, title }) => {
  const { data, error, isError, isLoading } = useMovieVideoQuery({ id });

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
        {error?.message || "영화 정보를 불러오는 중 오류가 발생했습니다."}
      </Alert>
    );
  }

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

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div
        className={styles.imgBox}
        style={{
          backgroundImage:
            "url(" + `https://image.tmdb.org/t/p/original${posterUrl}` + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "auto",
        }}
      >
        {posterUrl || posterUrl !== null ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${posterUrl}`}
            style={{ objectFit: "contain" }}
            onError={handleImageError}
            alt={title}
          />
        ) : (
          <div
            style={{
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
            }}
            className="movieCard"
            data-index={typeof index !== "undefined" ? index + 1 : ""}
          >
            {" "}
            {title}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="video-container" style={{ width: "100%" }}>
      <YouTube
        videoId={data.results[0].key}
        title={data.results[0].name}
        style={{ aspectRatio: "16/9" }}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 0,
            rel: 0,
            modestbranding: 1,
            controls: 0,
          },
        }}
        onError={(e) => {
          console.error("YouTube Player Error:", e.data);
        }}
        onEnd={(e) => {
          e.target.stopVideo(0);
        }}
      />
    </div>
  );
};

export default VideoYutube;
