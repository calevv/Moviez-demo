import React, { useState } from "react";
import styles from "./Reviews.module.css";
import { useParams } from "react-router-dom";
import { useMovieReviewsQuery } from "../../../../hooks/useMovieReviews.js";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button, CircularProgress, Container } from "@mui/material";
import { Alert } from "react-bootstrap";

import Slider from "react-slick";
const Reviews = () => {
  const { id } = useParams();
  const { data, error, isError, isLoading } = useMovieReviewsQuery({ id });
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
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    rows: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: { rows: 1 },
      },
    ],
  };
  const localDate = (reviewDate) => {
    const date = new Date(reviewDate);
    const koreanTimeString = date.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });
    return koreanTimeString;
  };

  const ReviewItem = ({ review }) => {
    const [expanded, setExpanded] = useState(false);
    const maxLength = 200;
    const reviewText = review?.content ? review?.content : "리뷰 내용 없음";
    const isLong = reviewText.length > maxLength;
    const displayedText = expanded
      ? reviewText
      : reviewText.slice(0, maxLength);
    const handleToggle = () => {
      setExpanded(!expanded);
    };
    return (
      <ListItem divider={true}>
        <ListItemText
          primary={review?.author}
          secondary={
            <div className={styles.reviewText}>
              <span>{localDate(review?.updated_at)}</span>
              {displayedText}{" "}
              {isLong && (
                <Button variant="outlined" size="small" onClick={handleToggle}>
                  {expanded ? "접기" : "더보기"}
                </Button>
              )}
            </div>
          }
        />
      </ListItem>
    );
  };

  return (
    <div>
      {data?.total_results === 0 ? (
        "등록된 리뷰가 없습니다."
      ) : (
        <Slider
          {...settings}
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          {data?.results.map((review) => (
            <ReviewItem review={review} key={review?.id} />
          ))}{" "}
        </Slider>
      )}
    </div>
  );
};

export default Reviews;
