import { CCollapse, CButton } from "@coreui/react";
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
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>Profile</h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div className="card" style={{ width: "49%" }}>
            <div className="card-header">
              <h3 style={{ display: "inline" }}>Posted Posts</h3>
            </div>
            <div className="card-body">
              {!!this.state.posted && this.state.posted.length > 0 ? (
                this.state.posted.map((postId) => {
                  return <ProfilePostCollapseComponent postId={postId} />;
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "1.20rem",
                    padding: "1vh",
                  }}
                >
                  No Posts
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ width: "49%" }}>
            <div className="card-header">
              <h3 style={{ display: "inline" }}>Purchased Posts</h3>
            </div>
            <div className="card-body">
              {!!this.state.owned && this.state.owned.length > 0 ? (
                this.state.owned.map((postId) => {
                  return <ProfilePostCollapseComponent postId={postId} />;
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "1.20rem",
                    padding: "1vh",
                  }}
                >
                  No Posts
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
