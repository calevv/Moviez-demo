import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Stack, Button } from '@mui/material';
import { useMovieGenreQuery } from '../../../../hooks/useMovieGenre';
import useFilterStore from '../../../../stores/useFilterStore';
import RestoreIcon from '@mui/icons-material/Restore';
import styles from './FilterBox.module.css';

const FilterBox = () => {
    const { data: genreData } = useMovieGenreQuery();
    const { setSelectedGenre, setSelectedPopular, selectedPopular } = useFilterStore();

    const handleGenreChange = (event) => {
        const selectedValue = event.target.value;
        const selectedGenreObject = genreData?.find((genre) => genre.id === selectedValue) || null;
        setSelectedGenre(selectedGenreObject);
    };

    const popularity = [
        { id: 1, popular: 'popularity.desc', label: '인기순 ↑' },
        { id: 2, popular: 'popularity.asc', label: '인기순 ↓' },
    ];
    const handlePopularChange = (event) => {
        const value = event.target.value;
        setSelectedPopular(value);
    };
    return (
        <Stack sx={{ flexDirection: { md: 'row', sm: 'column' }, gap: '20px' }} className={styles.container}>
            <FormControl fullWidth>
                <InputLabel id="genre-select-label">장르</InputLabel>
                <Select
                    labelId="genre-select-label"
                    id="genre-select"
                    value={useFilterStore((state) => state.selectedGenre?.id) || ''}
                    label="장르"
                    onChange={handleGenreChange}
                >
                    <MenuItem value="">전체</MenuItem>
                    {genreData?.map((genre) => (
                        <MenuItem key={genre.id} value={genre.id}>
                            {genre.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="sort-by-label">인기순</InputLabel>
                <Select
                    labelId="sort-by-label"
                    id="sort-by"
                    value={selectedPopular}
                    label="인기순"
                    onChange={handlePopularChange}
                >
                    <MenuItem value="">전체</MenuItem>
                    {popularity.map((option) => (
                        <MenuItem key={option.id} value={option.popular}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={() => {
                    setSelectedGenre('');
                    setSelectedPopular('');
                }}
            >
                <RestoreIcon />
            </Button>
        </Stack>
    );
};

export default FilterBox;
