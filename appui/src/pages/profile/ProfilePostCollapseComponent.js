import { CCard, CCardBody, CCardHeader, CCollapse } from "@coreui/react";
import "./Profile.scss";
import React from "react";
import { myBlockContract } from "../../config";
import PostViewComponent from "../post/PostViewComponent";
import processError from "../../util/ErrorUtil";
import { freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

class ProfilePostCollapseComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      id: props.postId,
    };
  }

  async toggle() {
    if (!this.props.accountId) {
      return;
    }

    this.setState({ collapse: !this.state.collapse });

    if (!this.state.post) {
      try {
        const post = await myBlockContract.methods
          .getPostDetails(this.state.id)
          .call();

        try {
          const ipfsHash = await myBlockContract.methods
            .viewPost(this.state.id)
            .call({ from: this.props.accountId });

          this.setState({
            post: { ...post, ipfsHash: ipfsHash },
          });
        } catch (err) {
          processError(err);

          this.setState({
            post,
          });
        }
      } catch (err) {
        // invalid post
        processError(err);
      }
    }
  }

  render() {
    return (
      <CCard className="post-tile">
        <CCardHeader className="display-flex align-items-centerx">
          <div
            onClick={this.toggle.bind(this)}
            className="title-and-carrot-holder"
          >
            <h3>{"Post #" + this.state.id}</h3>
            <CIcon size={"1xl"} content={freeSet.cilCaretBottom} />
          </div>
          <a href={"#/pages/postView/" + this.state.id}>
            <div className="fullscreen-icon">
              <CIcon size={"1xl"} content={freeSet.cilFullscreen} />
            </div>
          </a>
        </CCardHeader>

        <CCollapse show={this.state.collapse}>
          {!!this.state.post ? (
            <PostViewComponent
              post={this.state.post}
              accountId={this.props.accountId}
              privateKey={this.props.privateKey}
            />
          ) : (
            <div className="textalign-center">Unable To Load Post</div>
          )}
        </CCollapse>
      </CCard>
    );
  }
}

export default ProfilePostCollapseComponent;
