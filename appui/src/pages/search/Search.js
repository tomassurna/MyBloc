import React from "react";
import { myBlockContract } from "../../config";
import PostSummaryComponent from "./../recent/PostSummaryComponent";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postDetails: [],
    };

    this.search = this.search.bind(this);
  }

  async search(event) {
    var postDetails = [];
    this.setState({ postDetails });

    const searchValue = event.target.value;
    console.log("sv", searchValue);

    let i = 0;
    do {
      i++;
      const result = await myBlockContract.methods
        .searchPost(searchValue, i)
        .call();

      console.log("result", result);

      const post = await myBlockContract.methods.getPostDetails(result).call();

      if (result != 0) {
        postDetails.push({
          title: post.title,
          description: post.description,
          dislikes: post.dislikes,
          fee: post.fee,
          id: post.id,
          likes: post.likes,
        });
      }

      i = result;
      console.log("i ", i);
    } while (i != 0);
    this.setState({ postDetails });
  }

  render() {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3 style={{ display: "inline" }}>Search</h3>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <label style={{ width: "100%" }}>
              Search:
              <input
                style={{ width: "100%" }}
                class="form-control"
                placeholder={"Search"}
                onChange={this.search}
              ></input>
            </label>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {this.state.postDetails.map((post) => {
              return <PostSummaryComponent post={post} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
