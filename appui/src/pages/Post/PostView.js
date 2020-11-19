import React from "react";
import { account0, myBlockContract } from "../../config";
import CIcon from "@coreui/icons-react";
import { freeSet, brandSet } from "@coreui/icons";
import { CCard, CCardBody, CCol, CButton } from "@coreui/react";
import processError from "../../util/ErrorUtil";
import DescriptionViewComponent from "./DescriptionViewComponent";
import FeeLikeIconComponent from "./FeeLikeIconComponent";

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
      id: parseInt(props.match.params.postId),
      likes: 0,
    };

    this.loadPost(true);
  }

  async loadPost(initialLoad) {
    try {
      const post = await myBlockContract.methods
        .getPostDetails(this.state.id)
        .call();

      try {
        const ipfsHash = await myBlockContract.methods
          .viewPost(this.state.id)
          .call({ from: account0 });

        this.setState({
          description: post.description,
          dislikes: post.dislikes,
          fee: post.fee,
          likes: post.likes,
          ipfsHash: ipfsHash,
        });
      } catch (err) {
        if (!initialLoad) {
          processError(err);
        }

        this.setState({
          description: post.description,
          dislikes: post.dislikes,
          fee: post.fee,
          likes: post.likes,
        });
      }
    } catch (err) {
      // invalid post
      processError(err);
    }
  }

  async purchasePost() {
    try {
      await myBlockContract.methods
        .buyPost(this.state.id)
        .send(
          { from: account0, value: this.state.fee },
          (error, transactionHash) => {
            if (!error) {
              this.loadPost(false);
            } else {
              console.log(error);
            }
          }
        );
    } catch (err) {
      processError(err);
    }
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
                        style={{ maxWidth: "90%", maxHeight: "90%" }}
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
                    <DescriptionViewComponent
                      description={this.state.description}
                    />
                    <FeeLikeIconComponent
                      likes={this.state.likes}
                      dislikes={this.state.dislikes}
                      fee={this.state.fee}
                      id={this.state.id}
                    />
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
