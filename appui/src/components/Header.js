import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CHeaderNav,
  CHeaderNavItem,
  CCreateElement,
} from "@coreui/react";

// sidebar nav config
import navigation from "./HeaderData";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <CHeader withSubheader>
      <CHeaderNav className="px-3">
        <a class="c-header-brand" href="#">
          <h3 style={{ display: "inline" }}>MyBlock</h3>
        </a>
        <span class="c-header-toggler">
          <span class="c-header-toggler-icon"></span>
        </span>
        <ul class="c-header-nav mr-auto">
          <li class="c-header-nav-item active">
            <a class="c-header-nav-link" href="#">
              Home
            </a>
          </li>
          <li class="c-header-nav-item">
            <a class="c-header-nav-link" href="#/pages/recent">
              Recent
            </a>
          </li>
          <li class="c-header-nav-item">
            <a class="c-header-nav-link" href="#/pages/search">
              Search
            </a>
          </li>
          <li class="c-header-nav-item">
            <a class="c-header-nav-link" href="#/pages/post">
              Post
            </a>
          </li>
        </ul>
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
