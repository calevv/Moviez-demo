import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Movies.style.css';
import FilterBox from './components/FilterBox/FilterBox';
import SearchList from './components/SearchList/SearchList';
import { Container } from '@mui/material';
import FilterList from './components/FilterList/FilterList';

const Movies = () => {
    const [query] = useSearchParams();
    const keyword = query.get('q');

    return (
        <Container className="moviesContainer">
            <FilterBox />
            {keyword ? <SearchList keyword={keyword} /> : <FilterList />}
        </Container>
    );
};

export default Movies;
