import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import "./Profile.scss";
import React from "react";
import { account0, myBlockContract } from "../../config";
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
    const owned = await myBlockContract.methods
      .getUserOwned()
      .call({ from: account0 });
    const posted = await myBlockContract.methods
      .getUserPosted()
      .call({ from: account0 });

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
                  return <ProfilePostCollapseComponent postId={postId} />;
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
                  return <ProfilePostCollapseComponent postId={postId} />;
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
