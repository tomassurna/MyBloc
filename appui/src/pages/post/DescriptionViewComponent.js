import React from "react";
import "./Post.scss";

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
      <div className="description-container">
        <div className="description-title">{" " + this.state.title}</div>
        <div className="description-text">{" " + this.props.description}</div>
      </div>
    );
  }
}

export default DescriptionViewComponent;
