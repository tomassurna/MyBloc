import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import Web3 from "web3";
import { myBlocABI, myBlocAddress, projectId } from "../../config";
import processError from "../../util/ErrorUtil";
import "./Profile.scss";
import ProfilePostCollapseComponent from "./ProfilePostCollapseComponent";

let web3;
let myBlocContract;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owned: [],
    };

    this.loadData();
  }

  async loadData() {
    try {
      // If private key is not set then do not proceed
      if (!this.props.accountId) {
        return;
      }

      // if web3 or contract haven't been intialized then do so
      if (!web3 || !myBlocContract) {
        web3 = new Web3(
          new Web3.providers.HttpProvider(
            !!this.props.privateKey
              ? "https://ropsten.infura.io/v3/" + projectId
              : "http://localhost:8545"
          )
        );
        myBlocContract = new web3.eth.Contract(myBlocABI, myBlocAddress);
      }

      const owned = await myBlocContract.methods
        .getUserOwned()
        .call({ from: this.props.accountId });
      const posted = await myBlocContract.methods
        .getUserPosted()
        .call({ from: this.props.accountId });

      this.setState({ owned, posted });
    } catch (error) {
      processError(error);
    }
  }

  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            <h3 className="display-inline">Profile</h3>
          </CCardHeader>
        </CCard>

        <div className="profile-posts-container">
          <CCard className="width-49">
            <CCardHeader>
              <h3 className="display-inline">Posted Posts</h3>
            </CCardHeader>
            <CCardBody>
              {!!this.state.posted && this.state.posted.length > 0 ? (
                this.state.posted.map((postId) => {
                  return (
                    <ProfilePostCollapseComponent
                      accountId={this.props.accountId}
                      privateKey={this.props.privateKey}
                      postId={postId}
                      key={postId}
                    />
                  );
                })
              ) : (
                <div className="no-posts">No Posts</div>
              )}
            </CCardBody>
          </CCard>

          <CCard className="width-49">
            <CCardHeader>
              <h3 className="display-inline">Purchased Posts</h3>
            </CCardHeader>
            <CCardBody>
              {!!this.state.owned && this.state.owned.length > 0 ? (
                this.state.owned.map((postId) => {
                  return (
                    <ProfilePostCollapseComponent
                      accountId={this.props.accountId}
                      privateKey={this.props.privateKey}
                      postId={postId}
                      key={postId}
                    />
                  );
                })
              ) : (
                <div className="no-posts">No Posts</div>
              )}
            </CCardBody>
          </CCard>
        </div>
      </>
    );
  }
}

export default Profile;
