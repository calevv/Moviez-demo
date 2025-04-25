import React, { Fragment } from "react";
import useDetailStore from "../../../../stores/useDetailStore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMovieGenreQuery } from "../../../../hooks/useMovieGenre";
import { Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useMovieCraditQuery } from "../../../../hooks/useMovieCradit";

const Info = () => {
  const { detailData } = useDetailStore();
  const { data: genreData, isLoading } = useMovieGenreQuery();
  const { id } = useParams();
  const { data: creditData } = useMovieCraditQuery({ id });

  const showGenre = (genreIdList) => {
    if (!genreIdList || isLoading) return [];
    return genreIdList.map((list) => {
      const genreObject = genreData?.find((genre) => genre?.id === list.id);
      return genreObject?.name || "알 수 없는 장르";
    });
  };

  const castList = creditData?.cast || [];
  const crewList = creditData?.crew || [];
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">시놉시스</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ wordBreak: "keep-all" }}>
            {detailData?.overview
              ? detailData?.overview
              : "현재 해당 영화의 시놉시스 정보가 준비 중입니다."}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">장르</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            {detailData?.genres.length !== 0
              ? showGenre(detailData?.genres).map((item, index) => (
                  <Fragment key={index}>
                    <Button>{item}</Button>
                    {index < detailData.genres.length - 1 && "ㆍ"}
                  </Fragment>
                ))
              : "현재 해당 영화 장르 정보가 준비 중입니다."}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">출연진</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <Typography component="div">
              {castList.length !== 0 ? (
                castList.length > 5 ? (
                  <>
                    {castList.slice(0, 5).map((actor, index) => (
                      <Fragment key={actor.credit_id}>
                        <Button index={index}>{actor.name}</Button>
                        {index < castList.length - 1 && "ㆍ"}
                      </Fragment>
                    ))}
                    {` 외 ${castList.length - 5} 명`}
                  </>
                ) : (
                  castList.map((actor, index) => (
                    <Fragment key={actor.credit_id}>
                      <Button index={index}>{actor.name}</Button>
                      {index < castList.length - 1 && "ㆍ"}
                    </Fragment>
                  ))
                )
              ) : (
                "현재 해당 영화 출연진 정보가 준비 중입니다."
              )}
            </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">제작진</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            <Typography component="div">
              {crewList.length !== 0 ? (
                crewList.length > 5 ? (
                  <>
                    {crewList.slice(0, 5).map((crew, index) => (
                      <Fragment key={crew.credit_id}>
                        <Button index={index}>{crew.name}</Button>
                        {index < crewList.length - 1 && "ㆍ"}
                      </Fragment>
                    ))}
                    {` 외 ${crewList.length - 5} 명`}
                  </>
                ) : (
                  crewList.map((crew, index) => (
                    <Fragment key={crew.credit_id}>
                      <Button index={index}>{crew.name}</Button>
                      {index < crewList.length - 1 && "ㆍ"}
                    </Fragment>
                  ))
                )
              ) : (
                "현재 해당 영화 제작진 정보가 준비 중입니다."
              )}
            </Typography>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">추가정보</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Button>
              재생시간 : {Math.floor(detailData?.runtime / 60)} 시간
              {detailData?.runtime % 60} 분
            </Button>
            <Button style={{ display: "flex", gap: "4px" }}>
              제작언어 :{" "}
              {detailData?.spoken_languages.map((spoken, index) => (
                <Fragment key={index}>
                  <span>{spoken?.name}</span>
                  {index < detailData?.spoken_languages.length - 1 && "ㆍ"}
                </Fragment>
              ))}
            </Button>
            <Button style={{ display: "flex", gap: "4px" }}>
              제작국가 :{" "}
              {detailData?.origin_country.map((country, index) => (
                <Fragment key={index}>
                  <span>{country}</span>
                  {index < detailData?.origin_country.length - 1 && "ㆍ"}
                </Fragment>
              ))}
            </Button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Info;
