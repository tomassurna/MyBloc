import React from "react";
import { TheContent, TheFooter, TheHeader } from "./index";
import Login from "./Login";

class TheLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalOpen: true,
      accountId: "",
      privateKey: "",
    };
  }

  onLoginCallback(accountId, privateKey) {
    this.setState({ accountId, privateKey, isLoginModalOpen: false });
  }

  onLogoutCallback() {
    this.setState({
      isLoginModalOpen: true,
      accountId: "",
      privateKey: "",
    });
  }

  render() {
    return (
      <div className="c-app c-default-layout">
        <div className="c-wrapper">
          <TheHeader
            accountId={this.state.accountId}
            privateKey={this.state.privateKey}
            onLogoutCallback={this.onLogoutCallback.bind(this)}
            // Hack to reconstruct the entire component in order for the account info to be passed in
            key={this.state.isLoginModalOpen ? "1" : "2"}
          />
          <div className="c-body layout">
            <TheContent
              accountId={this.state.accountId}
              privateKey={this.state.privateKey}
              // Hack to reconstruct the entire component in order for the account info to be passed in
              key={this.state.isLoginModalOpen ? "3" : "4"}
            />
            <Login
              accountId={this.state.accountId}
              privateKey={this.state.privateKey}
              onLoginCallback={this.onLoginCallback.bind(this)}
              isLoginModalOpen={this.state.isLoginModalOpen}
              // Hack to reconstruct the entire component in order for the account info to be passed in
              key={this.state.isLoginModalOpen ? "5" : "6"}
            />
          </div>
          <TheFooter />
        </div>
      </div>
    );
  }
}

export default TheLayout;
