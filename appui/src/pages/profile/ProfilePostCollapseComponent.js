import { freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCard, CCardHeader, CCollapse } from "@coreui/react";
import React from "react";
import { myBlocContract } from "../../config";
import processError from "../../util/ErrorUtil";
import PostViewComponent from "../post/PostViewComponent";
import "./Profile.scss";

class ProfilePostCollapseComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      id: props.postId,
    };
  }

  async toggle() {
    if (!this.state.post) {
      try {
        if (!window.ethereum || !window.ethereum.selectedAddress) {
          return;
        }

        const post = await myBlocContract.methods
          .getPostDetails(this.state.id)
          .call();

        try {
          const ipfsHash = await myBlocContract.methods
            .viewPost(this.state.id)
            .call({ from: window.ethereum.selectedAddress });

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

    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <CCard className="post-tile">
        <CCardHeader className="display-flex align-items-center">
          <div
            onClick={this.toggle.bind(this)}
            className="title-and-carrot-holder"
          >
            <h3>{"Post #" + this.state.id}</h3>
            <CIcon content={freeSet.cilCaretBottom} />
          </div>
          <a href={"#/pages/postView/" + this.state.id}>
            <div className="fullscreen-icon">
              <CIcon content={freeSet.cilFullscreen} />
            </div>
          </a>
        </CCardHeader>

        <CCollapse show={this.state.collapse}>
          {!!this.state.post ? (
            <PostViewComponent post={this.state.post} />
          ) : (
            <div className="textalign-center">Unable To Load Post</div>
          )}
        </CCollapse>
      </CCard>
    );
  }
}

export default ProfilePostCollapseComponent;
