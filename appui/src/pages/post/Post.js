import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import randomWords from "random-words";
import React from "react";
import Web3 from "web3";
import { myBlockABI, myBlockAddress, projectId } from "../../config";
import processError from "../../util/ErrorUtil";
import "./Post.scss";

const Tx = require("ethereumjs-tx").Transaction;

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

let web3;
let myBlockContract;

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

      // If private key is not set then do not proceed
      if (!this.props.accountId) {
        return;
      }

      // if web3 or contract haven't been intialized then do so
      if (!web3 || !myBlockContract) {
        web3 = new Web3(
          new Web3.providers.HttpProvider(
            !!this.props.privateKey
              ? "https://ropsten.infura.io/v3/" + projectId
              : "http://localhost:8545"
          )
        );
        myBlockContract = new web3.eth.Contract(myBlockABI, myBlockAddress);
      }

      if (this.state.imageBuffer == null) {
        return;
      }

      this.setState({ loading: true });

      const result = await ipfs.add(this.state.imageBuffer);

      this.setState({ imageHash: result[0].hash });

      if (!!this.props.privateKey) {
        const txCount = await web3.eth.getTransactionCount(
          this.props.accountId
        );

        const txObject = {
          nonce: web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(6700000),
          gasPrice: web3.utils.toHex((await web3.eth.getGasPrice()) * 1.15),
          to: myBlockContract._address,
          data: myBlockContract.methods
            .pushPost(
              this.state.imageHash,
              this.state.title,
              this.state.description,
              this.state.fee
            )
            .encodeABI(),
        };

        const tx = new Tx(txObject, { chain: "ropsten" });
        tx.sign(Buffer.from(this.props.privateKey.substr(2), "hex"));

        const serializedTx = tx.serialize();
        const raw = "0x" + serializedTx.toString("hex");

        await web3.eth.sendSignedTransaction(raw).catch((err) => {
          processError(err);
        });
      } else {
        await myBlockContract.methods
          .pushPost(
            this.state.imageHash,
            this.state.title,
            this.state.description,
            this.state.fee
          )
          .send({ from: this.props.accountId, gas: 6700000 });
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

  // Util method for generating fake test data. You need to select an image in the UI first. This will then generate 10 posts.
  async generateTestData() {
    // If private key is not set then do not proceed
    if (!this.props.accountId) {
      return;
    }

    // if web3 or contract haven't been intialized then do so
    if (!web3 || !myBlockContract) {
      web3 = new Web3(
        new Web3.providers.HttpProvider(
          !!this.props.privateKey
            ? "https://ropsten.infura.io/v3/" + projectId
            : "http://localhost:8545"
        )
      );
      myBlockContract = new web3.eth.Contract(myBlockABI, myBlockAddress);
    }

    if (this.state.imageBuffer == null) {
      return;
    }
    const imageBuffer = this.state.imageBuffer;
    const imageHash = (await ipfs.add(imageBuffer))[0].hash;

    for (let i = 0; i < 10; i++) {
      const title = randomWords(8).join(" ").substring(0, 25);
      const description = randomWords(100).join(" ").substring(0, 800);
      const fee = Math.floor(Math.random() * 6700000);

      try {
        await myBlockContract.methods
          .pushPost(imageHash, title, description, fee)
          .send({ from: this.props.accountId, gas: 6700000 });
      } catch (error) {
        processError(error);
        return;
      }
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
        {/* <CCard>
          <CCardBody>
            <CButton
              color="primary"
              onClick={this.generateTestData.bind(this)}
              className="height-25-rem"
            >
              Generate Test Data
            </CButton>
          </CCardBody>
        </CCard> */}
      </>
    );
  }
}

export default Post;
