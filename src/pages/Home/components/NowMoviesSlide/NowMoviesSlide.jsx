import React from 'react';
import { Alert } from 'react-bootstrap';
import { useNowMoviesQuery } from '../../../../hooks/useNowMovies';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './NowMoviesSlide.style.css';
import Slider from 'react-slick';
import MovieCard from '../MovieCard/MovieCard';

const NowMoviesSlide = () => {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    const { data, error, isError, isLoading } = useNowMoviesQuery();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return (
            <Alert key="danger" variant="danger">
                {error?.message || '영화 정보를 불러오는 중 오류가 발생했습니다.'}
            </Alert>
        );
    }

    const nows = data?.results || [];
    console.log('dd', nows);

    return (
        <div>
            <h2 className="slideTitle">지금 보는 영화 20 !</h2>
            <Slider {...settings} className="slider-box">
                {nows.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                ))}
            </Slider>
        </div>
    );
};

export default NowMoviesSlide;
