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


      <div style={{ width: "80%", textAlign:"justify" }}>
        <div>
          <span style={{ fontWeight: "bold" }}>Title: </span>
          {" " + this.state.title}
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Description: </span>
          {" " + this.props.description}
        </div>
      </div>
    );
  }
}

export default DescriptionViewComponent;
