import { CCard, CCardHeader } from "@coreui/react";
import React from "react";
import { myBlocContract } from "../../config";
import processError from "../../util/ErrorUtil";
import PostSummaryComponent from "./PostSummaryComponent";

class Recent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postDetails: [],
    };

    this.loadRecentPosts();
  }

  async loadRecentPosts() {
    try {
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        return;
      }

      var postDetails = [];
      var n_posts = await myBlocContract.methods
        .n_posts()
        .call({ from: window.ethereum.selectedAddress, gas: 6700000 });

      // grab the latest 10 posts
      for (var i = n_posts - 1; i > Math.max(0, n_posts - 11); i--) {
        const post = await myBlocContract.methods.getPostDetails(i).call();

        postDetails.push({
          title: post.title,
          description: post.description,
          dislikes: post.dislikes,
          fee: post.fee,
          id: post.id,
          likes: post.likes,
        });
        this.setState({ postDetails });
      }
    } catch (error) {
      processError(error);
      return;
    }
  }

  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            <h3 className="display-inline">Recent</h3>
          </CCardHeader>
        </CCard>
        <CCard>
          {this.state.postDetails.map((post) => {
            return <PostSummaryComponent post={post} key={post.id} />;
          })}
        </CCard>
      </>
    );
  }
}

export default Recent;
