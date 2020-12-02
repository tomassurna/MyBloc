import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { myBlockContract } from "../../config";
import processError from "../../util/ErrorUtil";
import "./Post.scss";
import PostViewComponent from "./PostViewComponent";

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
    if (!this.props.accountId) {
      return;
    }

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
    if (!this.props.accountId) {
      return;
    }

    try {
      await myBlockContract.methods.buyPost(this.state.id).send(
        {
          from: this.props.accountId,
          value: this.state.post.fee,
          gas: 6700000,
        },
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
                accountId={this.props.accountId}
                privateKey={this.props.privateKey}
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
