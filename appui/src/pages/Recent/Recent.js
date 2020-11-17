import { CCard, CCardBody, CCol } from "@coreui/react";
import React from "react";
import { account0, myBlockContract } from "../../config";

class Recent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postDetails: [],
    };

    this.loadRecentPosts();
  } 

  async loadRecentPosts() {
    var postDetails = [];
    var n_posts = await myBlockContract.methods.n_posts().call();

    for (var i = n_posts-1; i > Math.max(0, n_posts-11); i--) {
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

  generatePostCars() {}

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
              <CCol>
                <CCard style={{ margin: "20px 0px 20px 0px" }}>
                  <CCardBody>
                    Description: {post.description} <br />
                    Fee: {post.fee}
                  </CCardBody>
                </CCard>
              </CCol>
            );
          })}
        </div>
      </>
    );
  }
}

export default Recent;
