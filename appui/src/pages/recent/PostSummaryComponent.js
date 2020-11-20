import { CCard, CCardBody, CCol } from "@coreui/react";
import React from "react";
import DescriptionViewComponent from "../post/DescriptionViewComponent";
import FeeLikeIconComponent from "../post/FeeLikeIconComponent";

class PostSummaryComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={"#/pages/postView/" + this.props.post.id}>
        <CCol>
          <CCard style={{ margin: "20px 0px 20px 0px" }}>
            <CCardBody style={{ display: "flex" }}>
              <DescriptionViewComponent
                title={this.props.post.title}
                description={this.props.post.description}
              />
              <FeeLikeIconComponent
                likes={this.props.post.likes}
                dislikes={this.props.post.dislikes}
                fee={this.props.post.fee}
                id={this.props.post.id}
                disableOnClick={true}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </a>
    );
  }
}

export default PostSummaryComponent;
