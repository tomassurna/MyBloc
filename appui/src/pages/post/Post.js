import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { myBlocAddress, myBlocContract, web3 } from "../../config";
import processError from "../../util/ErrorUtil";
import "./Post.scss";

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
      title: "",
      description: "",
      fee: 0,
      loading: false,
    };
  }

  loadPost = (event) => {
    event.preventDefault();

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
    try {
      if (this.props.loading) {
        return;
      }

      if (this.state.imageBuffer == null) {
        return;
      }

      if (!window.ethereum || !window.ethereum.selectedAddress) {
        return;
      }

      this.setState({ loading: true });

      const result = await ipfs.add(this.state.imageBuffer);

      this.setState({ imageHash: result[0].hash });

      const transactionParameters = {
        to: myBlocAddress,
        from: window.ethereum.selectedAddress,
        data: myBlocContract.methods
          .pushPost(
            this.state.imageHash,
            this.state.title,
            this.state.description,
            this.state.fee
          )
          .encodeABI(),
      };

      const txHash = await window.window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      // Hack to wait for transaction to be mined before redirecting page
      let loop = true;
      while (loop) {
        const transaction = await web3.eth.getTransaction(txHash);

        if (!transaction.transactionIndex) {
          await new Promise((resolve) => setTimeout(resolve, 6000));
        } else {
          loop = false;
        }
      }

      this.setState({
        image: null,
        imageHash: "",
        title: "",
        description: "",
        fee: 0,
        loading: false,
      });

      this.props.history.push("/pages/recent");
    } catch (error) {
      processError(error);
      return;
    }
  }

  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            <h3 className="display-inline">Post</h3>
          </CCardHeader>
        </CCard>
        <CCard>
          <CCardBody>
            <div className="mb-3 form-group">
              <div className="image-Container">
                {!!this.state.image ? (
                  <img
                    src={this.state.image}
                    className="image"
                    alt="User Uploaded"
                  />
                ) : (
                  <></>
                )}
              </div>

              <label htmlFor="title" className="post-text">
                Title
                <input
                  className="form-control"
                  maxLength="25"
                  id="title"
                  value={this.state.title}
                  placeholder="Title - 25 Characters"
                  onChange={(event) =>
                    this.setState({ title: event.target.value })
                  }
                />
              </label>

              <label htmlFor="description" className="post-text">
                Description
                <textarea
                  type="textarea"
                  className="form-control"
                  maxLength="800"
                  id="description"
                  value={this.state.description}
                  placeholder="Add Description - 800 Characters"
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                ></textarea>
              </label>
              <label htmlFor="fee" className="post-text">
                Fee
                <input
                  type="number"
                  className="form-control"
                  min="0"
                  id="fee"
                  value={this.state.fee}
                  onChange={(event) =>
                    this.setState({ fee: event.target.value })
                  }
                ></input>
              </label>

              <div id="btn-group">
                <div className="display-inline-block float-right">
                  <div className="display-flex">
                    <CButton
                      color="success"
                      onClick={this.onAddPost.bind(this)}
                      className="height-25-rem"
                    >
                      {this.state.loading ? "Posting..." : "Add Post"}
                    </CButton>
                  </div>
                </div>
                <div className="float-left">
                  <label className="custom-file">
                    <input
                      type="file"
                      id="file2"
                      className="custom-file-input"
                      onChange={this.loadPost}
                    ></input>
                    <span className="custom-file-control"></span>
                  </label>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </>
    );
  }
}

export default Post;
