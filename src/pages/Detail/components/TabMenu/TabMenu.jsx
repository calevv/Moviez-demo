import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Info from "../Info/Info";
import Reviews from "../Reviews/Reviews";
import Recommend from "../Recommend/Recommend";

const TabMenu = () => {
  const [value, setValue] = useState("info");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value="info" label="상세 정보" />
          <Tab value="reviews" label="리뷰" />
          <Tab value="recommend" label="추천" />
        </Tabs>
        <div className="detail-content" style={{ padding: "20px" }}>
          {value === "info" && <Info />}
          {value === "reviews" && <Reviews />}
          {value === "recommend" && <Recommend />}
        </div>
      </Box>
    </div>
  );
};

export default TabMenu;
