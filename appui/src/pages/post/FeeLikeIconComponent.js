import React from "react";
import CIcon from "@coreui/icons-react";
import { freeSet, brandSet } from "@coreui/icons";
import { account0, myBlockContract } from "../../config";
import processError from "../../util/ErrorUtil";

class FeeLikeIconComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: props.likes,
      dislikes: props.dislikes,
      fee: props.fee,
      id: props.id,
      disableOnClick: !!!props.disableOnClick,
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
      await myBlockContract.methods
        .ratePost(this.state.id, false)
        .send({ from: account0 });

      this.setState({ dislikes: parseInt(this.state.dislikes) + 1 });
    } catch (err) {
      processError(err);
    }
  }

  async likePost() {
    try {
      await myBlockContract.methods
        .ratePost(this.state.id, true)
        .send({ from: account0 });

      this.setState({ likes: parseInt(this.state.likes) + 1 });
    } catch (err) {
      processError(err);
    }
  }

  render() {
    return (
      <div className={"post-icons"}>
        <div className={"icon-holder"}>
          <CIcon content={brandSet.cibEthereum} size="2xl" />
          <span className={"icon-text"}>{"$" + this.state.fee}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
