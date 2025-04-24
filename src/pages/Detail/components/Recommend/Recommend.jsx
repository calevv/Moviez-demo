import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieRecoQuery } from "../../../../hooks/useMovieReco";
import { Container } from "@mui/material";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import styles from "./Recommend.module.css";
const Recommend = () => {
  const { id } = useParams();

  const [page, setPage] = useState(1);
  const { data: recoData } = useMovieRecoQuery({ id, page });
  console.log(recoData);
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  return (
    <div>
      <Container>
        <div className={styles.box}>
          {recoData?.results.map((movie) => (
            <div>
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))}
        </div>
      </Container>
      {recoData?.total_pages > 1 && (
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          pageCount={recoData?.total_pages}
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
    </div>
  );
};

export default Recommend;
