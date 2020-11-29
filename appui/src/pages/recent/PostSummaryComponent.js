import { CCard, CCardBody, CCol } from "@coreui/react";
import React from "react";
import DescriptionViewComponent from "../post/DescriptionViewComponent";
import FeeLikeIconComponent from "../post/FeeLikeIconComponent";
import "./Recent.scss";

class PostSummaryComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={"#/pages/postView/" + this.props.post.id}>
        <CCol>
          <CCard className="icon-margin">
            <CCardBody className="display-flex">
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
