import React from "react";
import { CHeader, CHeaderNav } from "@coreui/react";
import Web3 from "web3";
import { account0 } from "../config";
import { brandSet, freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import "./Components.scss";
import MyBlockLogo from "../MyBlockLogo.png";

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
    const balance = web3.utils.fromWei(await web3.eth.getBalance(account0));

    if (balance !== this.state.balance) {
      this.setState({ balance: balance });
    }
  }

  render() {
    this.getBalance();

    return (
      <CHeader withSubheader>
        <CHeaderNav className="px-3 width-100">
          <a className="c-header-brand" href="//github.com/tomassurna/MyBlock">
          <img src={MyBlockLogo} alt="[MyBlock Logo]"/>
          </a>
          <span className="c-header-toggler">
            <span className="c-header-toggler-icon"></span>
          </span>
          <ul className="c-header-nav mr-auto">
            <li className="c-header-nav-item">
              <a className="c-header-nav-link" href="#/pages/recent">
                Recent
              </a>
            </li>
            <li className="c-header-nav-item">
              <a className="c-header-nav-link" href="#/pages/search">
                Search
              </a>
            </li>
            <li className="c-header-nav-item">
              <a className="c-header-nav-link" href="#/pages/post">
                Post
              </a>
            </li>
            <li className="c-header-nav-item active">
              <a className="c-header-nav-link" href="#/pages/aboutUs">
                About Us
              </a>
            </li>
            <li className="c-header-nav-item active">
              <a className="c-header-nav-link" href="#/pages/profile">
                Profile
              </a>
            </li>
          </ul>
          <div className="profile-info">
            <a href="#/pages/profile">
              <span>{account0 + " - "}</span>
              <span>
                <CIcon content={brandSet.cibEthereum} />
                {this.state.balance}
              </span>
              <CIcon
                content={freeSet.cilAddressBook}
                size={"2xl"}
                className="contract-book-icon"
              />
            </a>
          </div>
        </CHeaderNav>
      </CHeader>
    );
  }
}

export default Header;
