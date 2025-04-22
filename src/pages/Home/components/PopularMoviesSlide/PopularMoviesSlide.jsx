import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { Alert } from 'react-bootstrap';

import './PopularMoviesSlide.style.css';
import MovieSlider from './../../../../common/MovieSlider/MovieSlider';

const PopularMoviesSlide = () => {
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
 

    return (
        <div>
            <MovieSlider title={'유명영화 20선'} movies={populars} />
        </div>
    );
};

export default PopularMoviesSlide;
