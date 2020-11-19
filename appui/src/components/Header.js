import React from "react";
import { CHeader, CHeaderNav } from "@coreui/react";
import Web3 from "web3";
import { account0 } from "../config";
import { brandSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

let web3;

class Header extends React.Component {
  constructor(props) {
    super(props);
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    this.state = {
      balance: 0,
    };

    this.getBalance();
  }

  async getBalance() {
    const balance = await web3.eth.getBalance(account0);

    this.setState({ balance: web3.utils.fromWei(balance) });
  }

  render() {
    return (
      <CHeader withSubheader>
        <CHeaderNav className="px-3" style={{ width: "100%" }}>
          <a class="c-header-brand" href="#">
            <h3 style={{ display: "inline" }}>MyBlock</h3>
          </a>
          <span class="c-header-toggler">
            <span class="c-header-toggler-icon"></span>
          </span>
          <ul class="c-header-nav mr-auto">
            <li class="c-header-nav-item active">
              <a class="c-header-nav-link" href="#">
                Home
              </a>
            </li>
            <li class="c-header-nav-item">
              <a class="c-header-nav-link" href="#/pages/recent">
                Recent
              </a>
            </li>
            <li class="c-header-nav-item">
              <a class="c-header-nav-link" href="#/pages/search">
                Search
              </a>
            </li>
            <li class="c-header-nav-item">
              <a class="c-header-nav-link" href="#/pages/post">
                Post
              </a>
            </li>
          </ul>
          <div style={{ float: "right" }}>
            <span>{account0 + " - "}</span>
            <span>
              <CIcon content={brandSet.cibEthereum} />
              {this.state.balance}
            </span>
          </div>
        </CHeaderNav>
      </CHeader>
    );
  }
}

export default Header;
