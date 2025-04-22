import React, { useEffect, useState } from 'react';
import { useSearchMoviesQuery } from '../../hooks/useSearchMovies';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Button, Container, Grid } from '@mui/material';
import MovieCard from '../../common/MovieCard/MovieCard';
import './Movies.style.css';
import ReactPaginate from 'react-paginate';
import CircularProgress from '@mui/material/CircularProgress';
const Movies = () => {
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const [page, setPage] = useState(1);
    const keyword = query.get('q');
    useEffect(() => {
        setPage(1);
    }, [keyword]);

    const { data, error, isError, isLoading } = useSearchMoviesQuery({ keyword, page });

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', marginTop: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress size="3rem" />
            </Container>
        );
    }

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
        <div>
            <Container sx={{ padding: '20px' }}>
                {data.total_results !== 0 ? (
                    <Grid container spacing={2}>
                        {data?.results.map((movie) => (
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
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={0}
                    pageCount={data?.total_pages} // 전체페이지
                    forcePage={page - 1} //선택페이지
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
            </Container>
        </div>
    );
};

export default Movies;
