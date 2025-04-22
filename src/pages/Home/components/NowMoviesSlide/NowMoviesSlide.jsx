import React from 'react';
import { Alert } from 'react-bootstrap';
import { useNowMoviesQuery } from '../../../../hooks/useNowMovies';

import './NowMoviesSlide.style.css';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';

const NowMoviesSlide = () => {
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

    return (
        <div>
            <MovieSlider movies={nows} title={'지금 사람들이 보는 영화들'} />
        </div>
    );
};

export default NowMoviesSlide;
