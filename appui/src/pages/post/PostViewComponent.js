import React from "react";
import { CCard, CCardBody, CCol, CButton, CCardHeader } from "@coreui/react";
import DescriptionViewComponent from "./DescriptionViewComponent";
import FeeLikeIconComponent from "./FeeLikeIconComponent";
import "./Post.scss";

class PostViewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

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
                />
              ) : !!this.props.purchasePost ? (
                <CButton
                  key={"purchasePost"}
                  color={"primary"}
                  size={"2xl"}
                  onClick={this.props.purchasePost}
                >
                  {" "}
                  Purchase Post
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
