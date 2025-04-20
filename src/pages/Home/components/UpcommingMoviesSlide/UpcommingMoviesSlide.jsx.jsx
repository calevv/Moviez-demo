import React from 'react';
import { Alert } from 'react-bootstrap';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './UpcommingMoviesSlide.style.css';
import Slider from 'react-slick';
import MovieCard from '../MovieCard/MovieCard';
import { useUpcommingMoviesQuery } from '../../../../hooks/useUpcommingMovies';

const UpcommingMoviesSlide = () => {
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

    const { data, error, isError, isLoading } = useUpcommingMoviesQuery();

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

    const upcomming = data?.results || [];

    console.log('upcomming', upcomming);

    return (
        <div>
            <h2 className="slideTitle">곧 개봉하는 영화</h2>
            <Slider {...settings} className="slider-box">
                {upcomming.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                ))}
            </Slider>
        </div>
    );
};

export default UpcommingMoviesSlide;
