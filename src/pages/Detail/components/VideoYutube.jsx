import React from 'react';

import { Alert } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useMovieVideoQuery } from '../../../hooks/useMovieVideo';
const VideoYutube = ({ id }) => {
    const { data, error, isError, isLoading } = useMovieVideoQuery({ id });

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
    return (
        <div>
            {' '}
            <YouTube
                videoId={data?.results[0].key}
                title={data?.results[0].name}
                style={{ aspectRatio: '16/9' }}
                opts={{
                    width: '100%',
                    height: '100%',
                    playerVars: {
                        autoplay: 1,
                        mute: 1,
                        loop: 0,
                        rel: 0,
                        modestbranding: 1,
                        controls: 0,
                    },
                }}
                //이벤트 리스너
                onEnd={(e) => {
                    e.target.stopVideo(0);
                }}
            />
        </div>
    );
};

export default VideoYutube;
