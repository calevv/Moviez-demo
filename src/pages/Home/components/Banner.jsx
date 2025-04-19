import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Banner.module.css';
import Carousel from 'react-bootstrap/Carousel';
import { usePopularMoviesQuery } from '../../../hooks/usePopularMovies';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';

const Banner = () => {
    const [bannerItems, setBannerItems] = useState([]);
    const { data, error, isError, isLoading } = usePopularMoviesQuery();
    if (isLoading) {
        <h1>Loading...</h1>;
    }
    if (isError) {
        <Alert key="danger" variant="danger">
            {error.message}
        </Alert>;
    }

    useEffect(() => {
        if (data?.results) {
            const randomItems = _.sampleSize(data.results, 5);
            setBannerItems(randomItems);
            console.log(randomItems);
        }
    }, [data]);
    return (
        <Carousel controls={false}>
            {bannerItems.map((item) => (
                <Carousel.Item
                    interval={2000}
                    className={styles.item}
                    style={{
                        height: '600px',
                        width: '100%',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: 'url(' + `https://image.tmdb.org/t/p/original/${item.backdrop_path}` + ')',
                    }}
                >
                    <Carousel.Caption className={styles.caption}>
                        <h5>{item.title}</h5>
                        <p>{item.original_title}</p>
                        <p className={styles.limited_text}>
                            {item.overview !== '' ? item.overview : '지금 꼭 봐야할 작품!'}
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
export default Banner;
