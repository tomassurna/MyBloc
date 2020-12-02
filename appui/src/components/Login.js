import React from "react";
import Modal from "react-modal";
import Web3 from "web3";
import { projectId } from "../config";
import "./Components.scss";

let web3;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountId: this.props.accountId,
      privateKey: this.props.privateKey,
      invalidAccountId: false,
      invalidPrivateKey: false,
    };
  }

  onLogin() {
    web3 = new Web3(
      new Web3.providers.HttpProvider(
        !!this.props.privateKey
          ? "https://ropsten.infura.io/v3/" + projectId
          : "http://localhost:8545"
      )
    );

    if (!!this.state.privateKey) {
      try {
        const account = web3.eth.accounts.privateKeyToAccount(
          this.state.privateKey,
          true
        );

        this.props.onLoginCallback(account.address, this.state.privateKey);
        this.setState({ invalidPrivateKey: false });
      } catch (error) {
        this.setState({ invalidPrivateKey: true });
      }
    } else if (!!this.state.accountId) {
      try {
        const isAddressValid = web3.utils.isAddress(this.state.accountId);

        if (isAddressValid) {
          this.props.onLoginCallback(
            this.state.accountId,
            this.state.privateKey
          );
          this.setState({ invalidAccountId: false });
        } else {
          this.setState({ invalidAccountId: true });
        }
      } catch (error) {
        this.setState({ invalidAccountId: true });
      }
    }
  }

  render() {
    Modal.setAppElement("body");

    return (
      <>
        <Modal isOpen={this.props.isLoginModalOpen}>
          <div className={"modal-header"}>
            <h4 style={{ margin: 0 }}>Login</h4>
          </div>
          <div className={"modal-body"}>
            <div className={"form-group justify-content"}>
              <div>
                <b>For Ropsten: </b> Only input private key.
              </div>
              <div>
                <b>For Local (w/ Ganache): </b> Only input account id.
              </div>
            </div>

            <div className={"form-group"}>
              <label>Account Id</label>
              <input
                type={"text"}
                placeholder={"Account Id"}
                value={this.state.accountId}
                className={"form-control"}
                onChange={(event) => {
                  this.setState({
                    accountId: event.target.value,
                  });
                }}
                disabled={!!this.state.privateKey}
              />
              {this.state.invalidAccountId ? (
                <div className="error">Invalid Account Id</div>
              ) : (
                <></>
              )}
            </div>
            <div className={"form-group"}>
              <label>Private Key</label>
              <input
                type={"text"}
                placeholder={"Private Key"}
                value={this.state.privateKey}
                className={"form-control"}
                onChange={(event) => {
                  this.setState({
                    privateKey: event.target.value.startsWith("0x")
                      ? event.target.value
                      : "0x" + event.target.value,
                  });
                }}
                disabled={!!this.state.accountId}
              />
              {this.state.invalidPrivateKey ? (
                <div className="error">Invalid Private Key</div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="modal-footer modal-footer">
            <button
              type="button"
              className="btn btn-success modal-save-btn"
              onClick={this.onLogin.bind(this)}
            >
              Login
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Login;
