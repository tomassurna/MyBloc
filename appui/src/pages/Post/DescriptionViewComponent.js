import React from "react";

class DescriptionViewComponent extends React.Component {
  render() {
    return (
      <div style={{ width: "80%", textAlign: "justify" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>Description: </span>
          {" " + this.props.description}
        </div>
      </div>
    );
  }
}

export default DescriptionViewComponent;
