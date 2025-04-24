import React, { useState } from "react";
import YouTube from "react-youtube";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useMovieVideoQuery } from "../../../../hooks/useMovieVideo";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

const ModalVideo = ({ id }) => {
  const { data, error, isError, isLoading } = useMovieVideoQuery({ id });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const trailerKey = data?.results?.[1]?.key || data?.results?.[0]?.key;
  const trailerName = data?.results?.[1]?.name || data?.results?.[0]?.name;

  return (
    <div>
      <Button
        style={{ borderRadius: "50%", aspectRatio: "1/1" }}
        variant="outlined"
        onClick={handleOpen}
      >
        <SmartDisplayIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!data || !data.results || data.results.length === 0 ? (
            <div>예고편 영상을 찾을 수 없습니다.</div>
          ) : (
            <YouTube
              videoId={trailerKey}
              title={trailerName}
              style={{ aspectRatio: "16/9" }}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                  mute: 0,
                  loop: 0,
                  rel: 0,
                  controls: 1,
                },
              }}
              onError={(e) => {
                console.error("YouTube Player Error:", e.data);
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalVideo;
