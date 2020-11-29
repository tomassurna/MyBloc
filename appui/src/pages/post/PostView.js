import React from "react";
import { account0, myBlockContract } from "../../config";
import processError from "../../util/ErrorUtil";
import PostViewComponent from "./PostViewComponent";
import "./Post.scss";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: parseInt(props.match.params.postId),
      post: null,
    };

    this.loadPost(true);
  }

  async loadPost(initialLoad) {
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
        if (!initialLoad) {
          processError(err);
        }

        this.setState({
          post,
        });
      }
    } catch (err) {
      // invalid post
      processError(err);
    }
  }

  async purchasePost() {
    try {
      await myBlockContract.methods
        .buyPost(this.state.id)
        .send(
          { from: account0, value: this.state.post.fee, gas: 6700000 },
          (error) => {
            if (!error) {
              this.loadPost(false);
            } else {
              processError(error);
            }
          }
        );
    } catch (err) {
      processError(err);
    }
  }

  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            <h3 className="display-inline">{"Post #" + this.state.id}</h3>
          </CCardHeader>
        </CCard>
        <CCard>
          <CCardBody>
            {!!this.state.post ? (
              <PostViewComponent
                post={this.state.post}
                purchasePost={this.purchasePost.bind(this)}
              />
            ) : (
              <div className="text-align-center">Loading...</div>
            )}
          </CCardBody>
        </CCard>
      </>
    );
  }
}

export default Post;
