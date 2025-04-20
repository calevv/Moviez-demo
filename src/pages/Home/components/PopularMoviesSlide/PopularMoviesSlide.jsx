import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'react-bootstrap';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './PopularMoviesSlide.style.css';
import Slider from 'react-slick';
import MovieCard from '../MovieCard/MovieCard';

const PopularMoviesSlide = () => {
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

    const { data, error, isError, isLoading } = usePopularMoviesQuery();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return (
            <Alert key="danger" variant="danger">
                {error?.message || '인기 영화 정보를 불러오는 중 오류가 발생했습니다.'}
            </Alert>
        );
    }

    const populars = data?.results || [];

    console.log('populars', populars);

    return (
        <div>
            <h2 className="slideTitle">지금 인기있는 영화 20 !</h2>
            <Slider {...settings} className="slider-box">
                {populars.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                ))}
            </Slider>
        </div>
    );
};

export default PopularMoviesSlide;
