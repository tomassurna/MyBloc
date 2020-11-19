import { CButton, CInput } from "@coreui/react";
import React from "react";
import { account0, myBlockContract } from "../../config";
import processError from "../../util/ErrorUtil";

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
      imageBuffer: null,
      image: null,
      imageHash: "",
      description: "",
      fee: 0,
    };
  }

  loadPost = (event) => {
    event.preventDefault();
    console.log("File caputered!");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({
        imageBuffer: Buffer(reader.result),
        image: URL.createObjectURL(event.target.files[0]),
      });
    };
  };

  async onAddPost() {
    if (this.state.imageBuffer == null) {
      return;
    }
    ipfs.add(this.state.imageBuffer, (error, result) => {
      if (!error) {
        this.setState({ imageHash: result[0].hash });

        myBlockContract.methods
          .pushPost(
            this.state.imageHash,
            this.state.description,
            this.state.fee
          )
          .send({ from: account0, gas: 6700000 }, (error, transactionHash) => {
            if (!error) {
              this.setState({
                image: null,
                imageHash: "",
                description: "",
                fee: 0,
              });
            } else {
              alert(error.message);
            }
          });
      } else {
        processError(error);
        return;
      }
    });
  }

  render() {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>Post</h3>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div class="mb-3" className="form-group" style={{}}>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {!!this.state.image ? (
                  <img
                    src={this.state.image}
                    style={{
                      maxWidth: "90%",
                      maxHeight: "90%",
                      marginBottom: "1vh",
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>

              <label
                htmlFor="description"
                style={{ "font-size": "15px", width: "100%" }}
              >
                Description
                <textarea
                  type="textarea"
                  class="form-control"
                  id="description"
                  value={this.state.description}
                  placeholder="Add Description"
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                ></textarea>
              </label>
              <label htmlFor="fee" style={{ fontSize: "15px", width: "100%" }}>
                Fee
                <input
                  type="number"
                  class="form-control"
                  min="0"
                  id="fee"
                  value={this.state.fee}
                  onChange={(event) =>
                    this.setState({ fee: event.target.value })
                  }
                ></input>
              </label>

              <div style={{ marginTop: "1vh" }}>
                <div style={{ float: "right", display: "inline-block" }}>
                  <div style={{ display: "flex" }}>
                    <CButton
                      color="success"
                      onClick={this.onAddPost.bind(this)}
                      style={{ height: "2.5rem" }}
                    >
                      Add Post
                    </CButton>
                  </div>
                </div>
                <div style={{ float: "left" }}>
                  <label class="custom-file">
                    <input
                      type="file"
                      id="file2"
                      class="custom-file-input"
                      onChange={this.loadPost}
                    ></input>
                    <span class="custom-file-control"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
