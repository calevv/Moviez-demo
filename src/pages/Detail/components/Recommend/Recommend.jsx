import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieRecoQuery } from '../../../../hooks/useMovieReco';
import { Container } from '@mui/material';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import { Alert } from 'react-bootstrap';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import useDetailStore from './../../../../stores/useDetailStore';

import Slider from 'react-slick';
const Recommend = () => {
    const { id } = useParams();
    const { detailData } = useDetailStore();
    const { data: recoData, isError, error } = useMovieRecoQuery({ id });

    const { data: popData, isError: popIsError, error: popError } = usePopularMoviesQuery();

    if (isError) {
        return (
            <Alert key="danger" variant="danger">
                {error?.message || '영화 정보를 불러오는 중 오류가 발생했습니다.'}
            </Alert>
        );
    }
    if (popIsError) {
        return (
            <Alert key="danger" variant="danger">
                {popError?.message || '영화 정보를 불러오는 중 오류가 발생했습니다.'}
            </Alert>
        );
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        rows: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    rows: 2,
                },
            },
            {
                breakpoint: 480,
                settings: { rows: 1 },
            },
        ],
    };

    return (
        <div>
            <Container>
                <h4>{detailData?.title} 를 본 사람들의 추천 영화</h4>
                <Slider {...settings} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {recoData?.total_results > 0
                        ? recoData?.results.map((movie) => (
                              <div className="recoCared">
                                  <MovieCard key={movie.id} movie={movie} />
                              </div>
                          ))
                        : popData?.results.map((movie) => (
                              <div className="recoCared">
                                  <MovieCard key={movie.id} movie={movie} />
                              </div>
                          ))}
                </Slider>
            </Container>
        </div>
    );
};

export default Recommend;
