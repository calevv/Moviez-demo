import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Button, Container, Grid } from '@mui/material';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import CircularProgress from '@mui/material/CircularProgress';
import useFilterStore from '../../../../stores/useFilterStore';
import { useSearchMoviesQuery } from '../../../../hooks/useSearchMovies';

const FilterList = ({ keyword }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { selectedGenre, setSelectedGenre, selectedPopular, setSelectedPopular } = useFilterStore();
    useEffect(() => {
        setPage(1);
        setSelectedGenre(null);
        setSelectedPopular(null);
    }, [keyword, setSelectedGenre]);

    let genreId = selectedGenre ? selectedGenre?.id : '';
    let popularValue = selectedPopular ? selectedPopular : '';

    const { data, error, isError } = useSearchMoviesQuery({
        keyword,
        page,
        genreId,
        popularValue,
    });

    if (isError) {
        return (
            <Alert key="danger" variant="danger">
                {error?.message || '검색 정보를 불러오는 중 오류가 발생했습니다.'}
            </Alert>
        );
    }
    console.log('datadata', data);
    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    return (
        <Container sx={{ padding: '20px' }}>
            {data?.results?.length > 0 ? (
                <Grid container spacing={2}>
                    {data.results.map((movie) => (
                        <Grid size={{ xs: 6, md: 3 }}>
                            <MovieCard key={movie.id} movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div>
                    <Alert
                        key="danger"
                        variant="danger"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        검색 결과가 없습니다.
                        <Button color="secondary" variant="contained" onClick={() => navigate(-1)}>
                            돌아가기
                        </Button>
                    </Alert>
                </div>
            )}
            {data?.total_pages > 1 && (
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={0}
                    pageCount={data?.total_pages}
                    forcePage={page - 1}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            )}
        </Container>
    );
};

export default FilterList;
