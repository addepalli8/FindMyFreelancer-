// @flow

import React, { Component } from "react";

// importing the style from the external css file
import "./noResultsFound.css";

// declaring the type of states and props used
type Props = {
  clearSearch: () => void,
};
type State = {};

class NoResultsFound extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="no-results-found">
        NO FREELANCERS WERE FOUND
        <div className="clear-button" onClick={this.props.clearSearch}>
          Clear Search
        </div>
      </div>
    );
  }
}

export default NoResultsFound;
