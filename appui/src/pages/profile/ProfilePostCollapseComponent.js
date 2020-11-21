import { CCollapse, CButton } from "@coreui/react";
import React from "react";
import { account0, myBlockContract } from "../../config";
import PostViewComponent from "../post/PostViewComponent";
import processError from "../../util/ErrorUtil";
import { brandSet, freeSet } from "@coreui/icons";
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
    this.setState({ collapse: !this.state.collapse });

    if (!this.state.post) {
      try {
        const post = await myBlockContract.methods
          .getPostDetails(this.state.id)
          .call();

        try {
          const ipfsHash = await myBlockContract.methods
            .viewPost(this.state.id)
            .call({ from: account0 });

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
      <div className="card" style={{ marginBottom: ".5rem" }}>
        <div
          className="card-header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            onClick={this.toggle.bind(this)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: "1",
            }}
          >
            <h3>{"Post #" + this.state.id}</h3>
            <CIcon size={"1xl"} content={freeSet.cilCaretBottom} />
          </div>
          <a href={"#/pages/postView/" + this.state.id}>
            <div style={{ marginLeft: "1vw", cursor: "pointer" }}>
              <CIcon size={"1xl"} content={freeSet.cilFullscreen} />
            </div>
          </a>
        </div>

        <CCollapse show={this.state.collapse}>
          {!!this.state.post ? (
            <PostViewComponent post={this.state.post} />
          ) : (
            <div style={{ textAlign: "center" }}>Unable To Load Post</div>
          )}
        </CCollapse>
      </div>
    );
  }
}

export default ProfilePostCollapseComponent;
