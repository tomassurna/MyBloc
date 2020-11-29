import React from "react";
import { myBlockContract } from "../../config";
import PostSummaryComponent from "./../recent/PostSummaryComponent";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import "./Search.scss";

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
      const post = await myBlockContract.methods.getPostDetails(result).call();

      postDetails.push({
        title: post.title,
        description: post.description,
        dislikes: post.dislikes,
        fee: post.fee,
        id: post.id,
        likes: post.likes,
      });

      this.setState({ postDetails });

      result++;
    }

    this.setState({ searching: false });
  }

  render() {
    return (
      <>
        <CCard>
          <CCardHeader>
            <h3 className="display-inline">Search</h3>
          </CCardHeader>
        </CCard>

        <CCard>
          <CCardBody>
            <label htmlFor="search" className="width-100 search-title">
              Search
              <input
                id="search"
                className="form-control width-100"
                placeholder={"Search"}
                onChange={this.onChangeSearchValue}
              ></input>
            </label>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardBody>
            {this.state.postDetails.length > 0 ? (
              this.state.postDetails.map((post) => {
                return <PostSummaryComponent post={post} />;
              })
            ) : (
              <div className="text-align-center">
                {this.state.searching ? "Searching..." : "No Results"}
              </div>
            )}
          </CCardBody>
        </CCard>
      </>
    );
  }
}

export default Search;
