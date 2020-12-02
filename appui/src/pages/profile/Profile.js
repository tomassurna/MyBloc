import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { myBlockContract } from "../../config";
import "./Profile.scss";
import ProfilePostCollapseComponent from "./ProfilePostCollapseComponent";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owned: [],
    };

    this.loadData();
  }

  async loadData() {
    if (!this.props.accountId) {
      return;
    }

    const owned = await myBlockContract.methods
      .getUserOwned()
      .call({ from: this.props.accountId });
    const posted = await myBlockContract.methods
      .getUserPosted()
      .call({ from: this.props.accountId });

    this.setState({ owned, posted });
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
