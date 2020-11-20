import React from "react";
import { account0, myBlockContract } from "../../config";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.search.bind(this);
  }

  async search(event) {
    const searchValue = event.target.value;
    console.log(searchValue);

    const result = await myBlockContract.methods
      .searchPost(searchValue, 1)
      .call();

    console.log(result);
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
      </>
    );
  }
}

export default Search;
