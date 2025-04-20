import React from 'react';
import './MovieCard.style.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const MovieCard = ({ movie, index }) => {
    const navigate = useNavigate();
    return (
        <div className="cardBox">
            <div
                className="movieCard"
                data-index={index + 1}
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                }}
            ></div>
            <Card className="movieCard_modal">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '1rem' }}>
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ display: 'flex' }}>
                        <ul>
                            {movie.genre_ids.map((item) => (
                                <li>{item}</li>
                            ))}{' '}
                        </ul>
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {movie.vote_average}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => navigate(`/movies/${movie.id}`)}>보러가기</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default MovieCard;
