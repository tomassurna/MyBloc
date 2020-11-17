import { CButton } from "@coreui/react";
import React from "react";
import { account0, myBlockContract } from "../../config";


const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewBuffer: null,
      previewHash: "QmP18n1vvhih5K5k9cRGSSUc7cAQLbrr8Hf7MKqqiBcJmc",
      description: "",
      fee: 0,
    };
  }

  loadPost = (event) =>{
    event.preventDefault();
    console.log('File caputered!');
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend=()=>{
      this.setState({previewBuffer: Buffer(reader.result)});
    }
  }

  // "QmP18n1vvhih5K5k9cRGSSUc7cAQLbrr8Hf7MKqqiBcJmc"
  // https://ipfs.infura.io/ipfs/QmP18n1vvhih5K5k9cRGSSUc7cAQLbrr8Hf7MKqqiBcJmc
  onSubmit = (event) =>{
    event.preventDefault();
    console.log("Submitting image to ipfs...");

    if(this.state.previewBuffer == null){
      console.log("Null Image Submitted...")
      return
    }
    ipfs.add(this.state.previewBuffer, (error, result) => {
        console.log('adding');
        console.log(result);
        this.setState({previewHash: result[0].hash})
        if(error){
          console.error(error);
          return
        }
    })
    console.log("Success!");

    //store on blockchain
  }

  onAddPost() {
    const post = {
      description: this.state.description,
      fee: this.state.fee,
    };

    const app = this;

    myBlockContract.methods
      .pushPost(this.state.description, this.state.fee)
      .send({ from: account0, gas: 6700000 }, (error, transactionHash) => {
        if (!error) {
          app.setState({ description: "", fee: 0 });
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

              <img src={`https://ipfs.infura.io/ipfs/${this.state.previewHash}`} width="100%" alt="[image preview]"/>

              <form onSubmit={this.onSubmit}>
                <input type='file' onChange={this.loadPost}/>
                <input type='submit'/>
              </form>
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
