import React from "react";
import { useParams } from "react-router-dom";

const Recommend = () => {
  const { id } = useParams();

  return <div>{id}Recommend</div>;
};

export default Recommend;
