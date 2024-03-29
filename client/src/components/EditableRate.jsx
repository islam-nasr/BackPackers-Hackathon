import React from "react";
import StarRatingComponent from "react-star-rating-component";

export default class EditableRate extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 1
    };
  }
  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }
  render() {
    const { rating } = this.state;
    return (
      <div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
