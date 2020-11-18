import { CCard, CCardBody, CCol } from "@coreui/react";
import React from "react";
import { account0, myBlockContract } from "../../config";
import CIcon from "@coreui/icons-react";
import { freeSet, brandSet } from "@coreui/icons";

class Recent extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      postDetails: [],
    };

    this.loadRecentPosts();
  }

  async loadRecentPosts() {
    var postDetails = [];
    var n_posts = await myBlockContract.methods.n_posts().call();

    for (var i = n_posts - 1; i > Math.max(0, n_posts - 11); i--) {
      const post = await myBlockContract.methods.getPostDetails(i).call();

      postDetails.push({
        description: post.description,
        dislikes: post.dislikes,
        fee: post.fee,
        id: post.id,
        likes: post.likes,
      });
      this.setState({ postDetails });
    }
  }

  render() {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>Recent</h3>
          </div>
        </div>
        <div className="card">
          {this.state.postDetails.map((post) => {
            return (
              <a href={"#/pages/postView/" + post.id}>
                <CCol>
                  <CCard style={{ margin: "20px 0px 20px 0px" }}>
                    <CCardBody style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div>
                          <span style={{ fontWeight: "bold" }}>
                            Description:{" "}
                          </span>
                          {" " + post.description}
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ float: "right" }}
                          className={"icon-holder"}
                        >
                          <CIcon content={freeSet.cilThumbUp} size="2xl" />
                          <span className={"icon-text"}>
                            {"x" + post.likes}
                          </span>
                        </div>
                        <div
                          style={{ float: "right", marginRight: "2vw" }}
                          className={"icon-holder"}
                        >
                          <CIcon content={freeSet.cilThumbDown} size="2xl" />
                          <span className={"icon-text"}>
                            {"x" + post.dislikes}
                          </span>
                        </div>
                        <div
                          style={{ float: "right", marginRight: "2vw" }}
                          className={"icon-holder"}
                        >
                          <CIcon content={brandSet.cibEthereum} size="2xl" />
                          <span className={"icon-text"}>{"$" + post.fee}</span>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              </a>
            );
          })}
        </div>
      </>
    );
  }
}

export default Recent;
