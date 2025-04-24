import { Container } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { Alert } from "react-bootstrap";
import VideoYutube from "./components/VideoYutube/VideoYutube";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import GradeIcon from "@mui/icons-material/Grade";
import ModalVideo from "./components/ModalVideo/ModalVideo";

const Detail = () => {
  const { id } = useParams();
  const { data, error, isError, isLoading } = useMovieDetailQuery({ id });

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
  console.log(data);
  let posterUrl = data?.poster_path;
  let title = data?.title;
  return (
    <div>
      <Container className={styles.container}>
        <div className={styles.videoBox}>
          <VideoYutube id={id} posterUrl={posterUrl} title={title} />
          <div className={styles.videoText}>
            <div className={styles.title}>
              <h1>{data?.title}</h1>
              <p>
                {" "}
                <GradeIcon />
                {data?.vote_average.toFixed(1)}
              </p>
              <h6>"{data?.tagline}"</h6>
            </div>
            <ModalVideo className={styles.modalBtn} id={id} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Detail;
