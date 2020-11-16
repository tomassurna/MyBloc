import { CButton } from "@coreui/react";
import React from "react";
import { account0, myBlockContract } from "../../config";

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      fee: 0,
    };
  }

  onAddPost() {
    const post = {
      description: this.state.description,
      fee: this.state.fee,
    };

    console.log(post);

    myBlockContract.methods
      .pushPost(this.state.description, this.state.fee)
      .send({ from: account0, gas: 6700000 }, (error, transactionHash) => {
        if (!error) {
        } else {
          alert(error.message);
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

              <div style={{ float: "right" }}>
                <CButton color="success" onClick={this.onAddPost.bind(this)}>
                  Add Post
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;