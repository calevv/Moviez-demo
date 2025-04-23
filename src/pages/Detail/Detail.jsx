import { Container } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { Alert } from 'react-bootstrap';
import VideoYutube from './components/VideoYutube';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import GradeIcon from '@mui/icons-material/Grade';
const Detail = () => {
    const { id } = useParams();
    const { data, error, isError, isLoading } = useMovieDetailQuery({ id });

    if (isLoading) {
        return (
            <Container
                sx={{
                    display: 'flex',
                    marginTop: '10%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress size="3rem" />
            </Container>
        );
    }

    if (isError) {
        return (
            <Alert key="danger" variant="danger">
                {error?.message || '영화 정보를 불러오는 중 오류가 발생했습니다.'}
            </Alert>
        );
    }
    console.log(data);

    return (
        <div>
            <Container className={styles.container}>
                <div className={styles.videoBox}>
                    <VideoYutube id={id} />
                    <div className={styles.videoText}>
                        <h1>{data?.title}</h1>
                        <p>
                            {' '}
                            <GradeIcon />
                            {data?.vote_average.toFixed(1)}
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Detail;
