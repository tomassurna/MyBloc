import React from "react";
import { myBlockContract } from "../../config";
import PostSummaryComponent from "./../recent/PostSummaryComponent";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postDetails: [],
      searchValue: "",
      typing: false,
      typingTimeout: 0,
      searching: false,
    };

    this.search = this.search.bind(this);
    this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
  }

  onChangeSearchValue(event) {
    const self = this;

    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      searchValue: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.search(self.state.searchValue);
      }, 500),
      searching: true,
    });
  }

  async search(searchValue) {
    var postDetails = [];
    this.setState({ postDetails });

    if (!searchValue) {
      return;
    }

    let result = 1;
    while (
      (result = await myBlockContract.methods
        .searchPost(searchValue, result)
        .call()) != 0
    ) {
      console.log("result", result);

      const post = await myBlockContract.methods.getPostDetails(result).call();

      postDetails.push({
        title: post.title,
        description: post.description,
        dislikes: post.dislikes,
        fee: post.fee,
        id: post.id,
        likes: post.likes,
      });
      result++;
    }
    this.setState({ postDetails, searching: false });
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
            <label htmlFor="search" style={{ fontSize: "15px", width: "100%" }}>
              Search
              <input
                style={{ width: "100%" }}
                id="search"
                className="form-control"
                placeholder={"Search"}
                onChange={this.onChangeSearchValue}
              ></input>
            </label>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {this.state.postDetails.length > 0 ? (
              this.state.postDetails.map((post) => {
                return <PostSummaryComponent post={post} />;
              })
            ) : (
              <div style={{ textAlign: "center" }}>
                {this.state.searching ? "Searching..." : "No Results"}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
