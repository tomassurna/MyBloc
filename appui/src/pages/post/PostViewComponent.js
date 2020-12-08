import { CButton, CCard, CCardBody, CCol } from "@coreui/react";
import React from "react";
import DescriptionViewComponent from "./DescriptionViewComponent";
import FeeLikeIconComponent from "./FeeLikeIconComponent";
import "./Post.scss";

class PostViewComponent extends React.Component {
  render() {
    return (
      <CCol>
        <CCard className="post-view-margin">
          <CCardBody>
            <div className="post-view-image-container">
              {!!this.props.post.ipfsHash ? (
                <img
                  src={`https://ipfs.infura.io/ipfs/${this.props.post.ipfsHash}`}
                  className="image"
                  alt="Post"
                />
              ) : !!this.props.purchasePost ? (
                <CButton
                  key={"purchasePost"}
                  color={"primary"}
                  size={"2xl"}
                  onClick={this.props.purchasePost}
                >
                  {this.props.loading ? "Purchasing..." : "Purchase Post"}
                </CButton>
              ) : (
                <div className="text-align-center">Post Image Missing</div>
              )}
            </div>
            <div className="display-flex">
              <DescriptionViewComponent
                title={this.props.post.title}
                description={this.props.post.description}
              />
              <FeeLikeIconComponent
                likes={this.props.post.likes}
                dislikes={this.props.post.dislikes}
                fee={this.props.post.fee}
                id={this.props.post.id}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    );
  }
}

export default PostViewComponent;
