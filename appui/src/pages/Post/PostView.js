import React from "react";
import { account0, myBlockContract } from "../../config";
import CIcon from "@coreui/icons-react";
import { freeSet, brandSet } from "@coreui/icons";
import { CCard, CCardBody, CCol, CButton } from "@coreui/react";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      dislikes: 0,
      fee: 0,
      id: props.match.params.postId,
      likes: 0,
    };

    this.loadPost();
  }

  async loadPost() {
    const post = await myBlockContract.methods
      .getPostDetails(this.state.id)
      .call();
    try {
      const ipfsHash = await myBlockContract.methods
        .viewPost(this.state.id)
        .call();

      console.log(ipfsHash);

      this.setState({
        description: post.description,
        dislikes: post.dislikes,
        fee: post.fee,
        likes: post.likes,
        ipfsHash: ipfsHash,
      });
    } catch (err) {
      console.log(err);

      this.setState({
        description: post.description,
        dislikes: post.dislikes,
        fee: post.fee,
        likes: post.likes,
      });
    }


  }

  async purchasePost() {
    const app = this;

    const something = await myBlockContract.methods
      .buyPost(this.state.id)
      .send({ from: account0, value: this.state.fee })
      .on("receipt", function (receipt) {
        // receipt example
        console.log(receipt);
      });

    console.log(something);

    // (receipt) => {
    //   console.log(receipt);

    //   if (!receipt.error) {
    //     console.log(receipt.ipfsHash);

    //     app.setState({
    //       ipfsHash: receipt.ipfsHash,
    //     });
    //   }
    // }
  }

  async dislikePost() {
    await myBlockContract.methods.ratePost(this.state.id, false).call();
    this.setState({ dislikes: this.state.dislikes++ });
  }

  async likePost() {
    await myBlockContract.methods.ratePost(this.state.id, true).call();
    this.setState({ likes: this.state.likes++ });
  }

  render() {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>{"Post #" + this.state.id}</h3>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            {" "}
            <CCol>
              <CCard style={{ margin: "20px 0px 20px 0px" }}>
                <CCardBody>
                  <div
                    style={{
                      width: "100%",
                      marginBottom: "7vh",
                      marginTop: "5vh",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {!!this.state.ipfsHash ? (
                      <img
                        src={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`}
                        width="100%"
                      />
                    ) : (
                      <CButton
                        key={"purchasePost"}
                        color={"primary"}
                        size={"2xl"}
                        onClick={this.purchasePost.bind(this)}
                      >
                        {" "}
                        Purchase Post
                      </CButton>
                    )}
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div>
                        <span style={{ fontWeight: "bold" }}>
                          Description:{" "}
                        </span>
                        {" " + this.state.description}
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        style={{ float: "right" }}
                        className={"icon-holder hand-cursor"}
                        onClick={this.likePost.bind(this)}
                      >
                        <CIcon content={freeSet.cilThumbUp} size="2xl" />
                        <span className={"icon-text"}>
                          {"x" + this.state.likes}
                        </span>
                      </div>
                      <div
                        style={{ float: "right", marginRight: "2vw" }}
                        className={"icon-holder hand-cursor"}
                        onClick={this.dislikePost.bind(this)}
                      >
                        <CIcon content={freeSet.cilThumbDown} size="2xl" />
                        <span className={"icon-text"}>
                          {"x" + this.state.dislikes}
                        </span>
                      </div>
                      <div
                        style={{ float: "right", marginRight: "2vw" }}
                        className={"icon-holder"}
                      >
                        <CIcon content={brandSet.cibEthereum} size="2xl" />
                        <span className={"icon-text"}>
                          {"$" + this.state.fee}
                        </span>
                      </div>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
