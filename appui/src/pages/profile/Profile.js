import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { myBlocContract } from "../../config";
import processError from "../../util/ErrorUtil";
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
    try {
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        return;
      }

      const owned = await myBlocContract.methods
        .getUserOwned()
        .call({ from: window.ethereum.selectedAddress });
      const posted = await myBlocContract.methods
        .getUserPosted()
        .call({ from: window.ethereum.selectedAddress });

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
