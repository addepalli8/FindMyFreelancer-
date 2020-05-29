// @flow

import React, { Component } from "react";

// importing the style from the external css file
import "./card.css";

// declaring the type of states used
type Props = {
  avatar: string,
  first_name: string,
  last_name: string,
  email: string
};
type State = {};

class Card extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // displaying the freelancers in cards format
  render() {
    return (
      <div className="freelancer-card">
        <div>
          <img alt="avatar" src={this.props.avatar} className="freelancer-avatar" />
        </div>
        <div className="freelancer-details">
          <div>{this.props.first_name + " " + this.props.last_name}</div>
          <a className="freelancer-mail" href={"mailto:" + this.props.email}>
            {this.props.email}
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
