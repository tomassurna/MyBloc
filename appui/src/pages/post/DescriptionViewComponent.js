import React from "react";

class DescriptionViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
    };
  }

  render() {
    return (
      <div style={{ width: "80%", textAlign: "justify" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: ".5vh" }}>
          <span style={{ fontWeight: "bold" }}>Title: </span>
          {" " + this.state.title}
        </div>
        <div style={{ marginLeft: "1vw" }}>
          <span style={{ fontWeight: "bold" }}>Description: </span>
          {" " + this.props.description}
        </div>
      </div>
    );
  }
}

export default DescriptionViewComponent;
