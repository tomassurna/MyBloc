import { CFooter } from "@coreui/react";
import React from "react";

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <a
          href="https://github.com/tomassurna/MyBlock"
          target="_blank"
          rel="noopener noreferrer"
        >
          MyBlock
        </a>
        <span className="ml-1">&copy; 2020</span>
        <span className="ml-1 version">v5</span>
      </div>
    </CFooter>
  );
};

export default React.memo(Footer);
