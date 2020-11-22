import React from "react";
import "./AboutUs.css";
import phil from "./philcover.jpg";
import tomas from "./tomascover.jpg";
import CIcon from "@coreui/icons-react";
import { brandSet } from "@coreui/icons";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>About Us</h3>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>What is MyBlock?</h3>
          </div>
          <div className="card-body">
            <p>
              MyBlock is an image sharing platform where users are paid for
              their posts. When posting an images, the user selects an access
              fee that is to be paid by other users. There is no percentage of
              your earnings deducted. This is effectively blockchain OnlyFans.
            </p>
            <p>
              Phillip Roesch and Tomas Surna founded MyBlock as their final
              project for the course Blockchain Technologies instructed by Prof.
              Coung Pham. Upon starting this project, Phillip set out to be the
              next Mark Zuckerberg, King of the Lizard People. Tomas responded
              saying, "This is just qualifiers, there is no reason to go this
              hard." However, Phillip disregarded this information and balled
              out to create MyBlock cause Tomas pinky promised to be his parter.
              Having his first follower, Phil set out to create the next social
              media empire, MyBlock.
            </p>
          </div>
        </div>

        <div className="listrow">
          <div className="card list">
            <div className="card-header">
              <b>Reasons to use MyBlock:</b>
            </div>
            <div className="card-body">
              <ul>
                <li>Post images with anominity</li>
                <li>Profit from your content</li>
                <li>Funds sent directly to you</li>
              </ul>
            </div>
          </div>{" "}
          <div className="card list">
            <div className="card-header">
              <b>MyBlock's current funcitonality</b>
            </div>
            <div className="card-body">
              <ul>
                <li>Post images for other</li>
                <li>Purchase images for viewing</li>
                <li>Rate posts to inform other users</li>
                <li>Search posts by keyword</li>
                <li>Profile to display posts posted and owned</li>
              </ul>
            </div>
          </div>{" "}
          <div className="card list">
            <div className="card-header">
              <b>Things a user should know before using MyBlock</b>
            </div>
            <div className="card-body">
              <ul>
                <li>
                  All posts are forever, you cannot delete or edit a current
                  post.
                </li>
                <li>
                  You can't like your own post, why would you post something you
                  didn't like?
                </li>
                <li>
                  <b>THERE IS NO NSFW FILTER</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>Founders</h3>
          </div>
        </div>
        <div className="person-row">
          <div className="card person-row-item">
            <div className="card-header person-header">
              <h3 style={{ display: "inline" }}>Phillip Roesch</h3>
              <a href="//www.linkedin.com/in/phillip-roesch">
                <CIcon
                  content={brandSet.cibLinkedin}
                  size={"2xl"}
                  style={{ marginLeft: "1vw" }}
                />
              </a>
            </div>
            <div className="card-body">
              <div className="person">
                <div className="image">
                  <img src={phil} alt="[phil cover photo]" />
                </div>
                <div className="bio">
                  <p>
                    Phillip Roesch is a current student at Wentworth Institute
                    of Technology, set to graduate Summer 2022.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card person-row-item">
            <div className="card-header person-header">
              <h3 style={{ display: "inline" }}>Tomas Surna</h3>

              <a href="//www.linkedin.com/in/tomassurna">
                <CIcon
                  content={brandSet.cibLinkedin}
                  size={"2xl"}
                  style={{ marginLeft: "1vw" }}
                />
              </a>
            </div>
            <div className="card-body">
              <div className="person">
                <div className="image">
                  <img src={tomas} alt="[tomas cover photo]" />
                </div>
                <div className="bio">
                  <p>
                    Tomas Surna is a current student at Wentworth Institute of
                    Technology set to graduate Summer 2021.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AboutUs;
