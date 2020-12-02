import { CCard, CCardHeader } from "@coreui/react";
import React from "react";
import Web3 from "web3";
import { myBlockABI, myBlockAddress } from "../../config";
import processError from "../../util/ErrorUtil";
import PostSummaryComponent from "./PostSummaryComponent";

let web3;
let myBlockContract;

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
      // If private key is not set then do not proceed
      if (!this.props.accountId) {
        return;
      }

      // if web3 or contract haven't been intialized then do so
      if (!web3 || !myBlockContract) {
        web3 = new Web3(
          new Web3.providers.HttpProvider(
            !!this.props.privateKey
              ? "https://ropsten.infura.io/v3/910f90d7d5f2414db0bb77ce3721a20b"
              : "http://localhost:8545"
          )
        );
        myBlockContract = new web3.eth.Contract(myBlockABI, myBlockAddress);
      }

      var postDetails = [];
      var n_posts = await myBlockContract.methods
        .n_posts()
        .call({ from: this.props.accountId, gas: 6700000 });

      // grab the latest 10 posts
      for (var i = n_posts - 1; i > Math.max(0, n_posts - 11); i--) {
        const post = await myBlockContract.methods.getPostDetails(i).call();

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
            return (
              <PostSummaryComponent
                post={post}
                accountId={this.props.accountId}
                privateKey={this.props.privateKey}
                key={post.id}
              />
            );
          })}
        </CCard>
      </>
    );
  }
}

export default Recent;
