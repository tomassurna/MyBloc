import { brandSet, freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import { myBlocAddress, myBlocContract } from "../../config";
import processError from "../../util/ErrorUtil";
import "./Post.scss";

class FeeLikeIconComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes,
      dislikes: props.dislikes,
      fee: props.fee,
      id: props.id,
      disableOnClick: !!!props.disableOnClick,
      alreadyVoted: false,
    };
  }

  static getDerivedStateFromProps(newProps, state) {
    if (!!newProps) {
      state = {
        likes: !!state.likes ? state.likes : newProps.likes,
        dislikes: !!state.dislikes ? state.dislikes : newProps.dislikes,
        fee: newProps.fee,
        id: newProps.id,
        disableOnClick: !!!newProps.disableOnClick,
      };

      return state;
    }

    return state;
  }

  async dislikePost() {
    try {
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        return;
      }

      const transactionParameters = {
        to: myBlocAddress,
        from: window.ethereum.selectedAddress,
        data: myBlocContract.methods.ratePost(this.state.id, false).encodeABI(),
      };

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      this.setState({
        dislikes: parseInt(this.state.dislikes) + 1,
        alreadyVoted: true,
      });
    } catch (err) {
      processError(err);
    }
  }

  async likePost() {
    try {
      if (this.state.alreadyVoted) {
        processError({ reason: "E005" });
        return;
      }

      if (!window.ethereum || !window.ethereum.selectedAddress) {
        return;
      }

      const transactionParameters = {
        to: myBlocAddress,
        from: window.ethereum.selectedAddress,
        data: myBlocContract.methods.ratePost(this.state.id, true).encodeABI(),
      };

      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      this.setState({
        likes: parseInt(this.state.likes) + 1,
        alreadyVoted: true,
      });
    } catch (err) {
      processError(err);
    }
  }

  render() {
    return (
      <div className={"post-icons"}>
        <div className={"icon-holder"}>
          <CIcon content={brandSet.cibEthereum} size="2xl" />
          <span className={"icon-text"}>{"WEI " + this.state.fee}</span>
        </div>
        <div className="thumbs-icon-holder">
          <div
            className={"icon-holder hand-cursor"}
            onClick={
              this.state.disableOnClick ? this.likePost.bind(this) : () => {}
            }
          >
            <CIcon content={freeSet.cilThumbUp} size="2xl" />
            <span className={"icon-text"}>{"x" + this.state.likes}</span>
          </div>
          <div
            className={"icon-holder hand-cursor"}
            onClick={
              this.state.disableOnClick ? this.dislikePost.bind(this) : () => {}
            }
          >
            <CIcon content={freeSet.cilThumbDown} size="2xl" />
            <span className={"icon-text"}>{"x" + this.state.dislikes}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FeeLikeIconComponent;
