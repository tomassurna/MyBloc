import React from "react";
import { CCard, CCardBody, CCol, CButton } from "@coreui/react";
import DescriptionViewComponent from "./DescriptionViewComponent";
import FeeLikeIconComponent from "./FeeLikeIconComponent";

class PostViewComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CCol>
        <CCard style={{ margin: "20px 0px 20px 0px" }}>
          <CCardBody>
            <div
              style={{
                width: "100%",
                marginBottom: "7vh",
                marginTop: "5vh",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {!!this.props.post.ipfsHash ? (
                <img
                  src={`https://ipfs.infura.io/ipfs/${this.props.post.ipfsHash}`}
                  style={{ maxWidth: "90%", maxHeight: "90%" }}
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
                <div style={{ textAlign: "center" }}>Post Image Missing</div>
              )}
            </div>
            <div style={{ display: "flex" }}>
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
