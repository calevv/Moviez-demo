import React, { Suspense } from 'react';
import Banner from './components/Banner/Banner';
import { CircularProgress, Container } from '@mui/material';
import PopularMoviesSlide from './components/PopularMoviesSlide/PopularMoviesSlide';
import NowMoviesSlide from './components/NowMoviesSlide/NowMoviesSlide';
import UpcommingMoviesSlide from './components/UpcommingMoviesSlide/UpcommingMoviesSlide.jsx';

// import styles from './Home.module.css';

const Home = () => {
    return (
        <div>
            <Suspense
                fallback={
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
                }
            >
                <Banner />
                <Container style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                    <PopularMoviesSlide />
                    <UpcommingMoviesSlide />
                    <NowMoviesSlide />
                </Container>
            </Suspense>
        </div>
    );
};

export default Home;
