import React from "react";

class DescriptionViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
    };
  }

  render() {
    return (
      <div style={{ width: "80%" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>Description: </span>
          {" " + this.state.description}
        </div>
      </div>
    );
  }
}

export default DescriptionViewComponent;
