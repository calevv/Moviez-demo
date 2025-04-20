import React from 'react';
import Banner from './components/Banner/Banner';
import { Container } from '@mui/material';
import PopularMoviesSlide from './components/PopularMoviesSlide/PopularMoviesSlide';
import NowMoviesSlide from './components/NowMoviesSlide/NowMoviesSlide';
import UpcommingMoviesSlide from './components/UpcommingMoviesSlide/UpcommingMoviesSlide.jsx';

// import styles from './Home.module.css';

const Home = () => {
    return (
        <div>
            <Banner />
            <Container style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <PopularMoviesSlide />
                <UpcommingMoviesSlide />
                <NowMoviesSlide />
            </Container>
        </div>
    );
};

export default Home;
