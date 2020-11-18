import React from "react";
import { TheContent, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body" style={{ width: "75vw", margin: "auto" }}>
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
