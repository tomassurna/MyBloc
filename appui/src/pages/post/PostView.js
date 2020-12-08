import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { myBlocAddress, myBlocContract, web3 } from "../../config";
import processError from "../../util/ErrorUtil";
import "./Post.scss";
import PostViewComponent from "./PostViewComponent";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: parseInt(props.match.params.postId),
      post: null,
      loading: false,
    };

    this.loadPost(true);
  }

  async loadPost(initialLoad) {
    let post;

    try {
      post = await myBlocContract.methods.getPostDetails(this.state.id).call();
    } catch (err) {
      // invalid post
      processError(err);
    }

    if (!post) {
      return;
    }

    try {
      const ipfsHash = await myBlocContract.methods
        .viewPost(this.state.id)
        .call({ from: window.ethereum.selectedAddress });

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
  }

  async purchasePost() {
    try {
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        return;
      }

      const transactionParameters = {
        to: myBlocAddress,
        from: window.ethereum.selectedAddress,
        value: web3.utils.toHex(this.state.post.fee),
        data: myBlocContract.methods.buyPost(this.state.id).encodeABI(),
      };

      await window.window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      this.setState({ loading: false });
      this.loadPost(false);
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
                loading={this.state.loading}
                key={this.state.post.id}
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
