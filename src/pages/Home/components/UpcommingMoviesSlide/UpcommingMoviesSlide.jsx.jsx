import React from 'react';
import { Alert } from 'react-bootstrap';

import './UpcommingMoviesSlide.style.css';
import { useUpcommingMoviesQuery } from '../../../../hooks/useUpcommingMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';

const UpcommingMoviesSlide = () => {
    const { data, error, isError } = useUpcommingMoviesQuery();

    if (isError) {
        return (
            <Alert key="danger" variant="danger">
                {error?.message || '영화 정보를 불러오는 중 오류가 발생했습니다.'}
            </Alert>
        );
    }

    const upcomming = data?.results || [];

    return (
        <div>
            <MovieSlider title={'곧 개봉하는 영화'} movies={upcomming} />
        </div>
    );
};

export default UpcommingMoviesSlide;
