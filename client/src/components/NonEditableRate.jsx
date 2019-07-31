import React from "react";

import StarRatingComponent from "react-star-rating-component";

export default class NonEditableRate extends React.Component {
  render() {
    this.rate = this.props.rate;
    return (
      <div>
        <StarRatingComponent
          name="rate2"
          editing={false}
          starCount={5}
          value={this.rate}
        />
      </div>
    );
  }
}
