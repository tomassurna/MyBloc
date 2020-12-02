import { freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCard, CCardHeader, CCollapse } from "@coreui/react";
import React from "react";
import Web3 from "web3";
import { MyBlocABI, MyBlocAddress, projectId } from "../../config";
import processError from "../../util/ErrorUtil";
import PostViewComponent from "../post/PostViewComponent";
import "./Profile.scss";

let web3;
let MyBlocContract;

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
        // If private key is not set then do not proceed
        if (!this.props.accountId) {
          return;
        }

        // if web3 or contract haven't been intialized then do so
        if (!web3 || !MyBlocContract) {
          web3 = new Web3(
            new Web3.providers.HttpProvider(
              !!this.props.privateKey
                ? "https://ropsten.infura.io/v3/" + projectId
                : "http://localhost:8545"
            )
          );
          MyBlocContract = new web3.eth.Contract(MyBlocABI, MyBlocAddress);
        }

        const post = await MyBlocContract.methods
          .getPostDetails(this.state.id)
          .call();

        try {
          const ipfsHash = await MyBlocContract.methods
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
