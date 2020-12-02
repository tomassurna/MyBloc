import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import randomWords from "random-words";
import React from "react";
import { myBlockContract } from "../../config";
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
    if (!this.props.accountId) {
      return;
    }

    if (this.state.imageBuffer == null) {
      return;
    }

    const result = await ipfs.add(this.state.imageBuffer);

    try {
      this.setState({ imageHash: result[0].hash });

      await myBlockContract.methods
        .pushPost(
          this.state.imageHash,
          this.state.title,
          this.state.description,
          this.state.fee
        )
        .send({ from: this.props.accountId, gas: 6700000 });

      this.setState({
        image: null,
        imageHash: "",
        title: "",
        description: "",
        fee: 0,
      });
    } catch (error) {
      processError(error);
      return;
    }
  }

  // Util method for generating fake test data. You need to select an image in the UI first. This will then generate 10 posts.
  async generateTestData() {
    if (!this.props.accountId) {
      return;
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
                  <img src={this.state.image} className="image" />
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
                      Add Post
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
        <CCard>
          <CCardBody>
            <CButton
              color="primary"
              onClick={this.generateTestData.bind(this)}
              className="height-25-rem"
            >
              Generate Test Data
            </CButton>
          </CCardBody>
        </CCard>
      </>
    );
  }
}

export default Post;
