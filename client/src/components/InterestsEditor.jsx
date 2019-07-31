import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class InterestsEditor extends Component {
  constructor(props) {
    super(props);
    if (props.interests) {
      this.state = {
        interests: props.interests
      };
    } else {
      this.state = {
        interests: []
      };
    }
    if (this.props.options) {
      this.options = this.props.options;
    } else {
      this.options = [
        "Art",
        "Food",
        "Museums",
        "Photography",
        "Culture",
        "History",
        "Nature"
      ];
      this.options.sort();
    }
  }
  addInterest(interest) {
    if (!this.state.interests.includes(interest)) {
      this.setState({
        interests: [...this.state.interests, interest]
      });
    }
  }
  removeInterest(interest) {
    console.log(interest);
    this.setState({
      interests: this.state.interests.filter(i => i != interest)
    });
  }
  render() {
    return (
      <div>
        <div className="mb-2">
          {this.state.interests.map(interest => (
            <Button
              variant="outline-dark"
              size="sm"
              className="button-interest"
              key={interest}
              value={interest}
              onClick={e => this.removeInterest(e.target.value)}
            >
              {interest}
            </Button>
          ))}
        </div>
        <Form.Control
          as="select"
          multiple
          onChange={e => this.addInterest(e.target.value)}
        >
          {this.options.map(option =>
            this.state.interests.includes(option) ? (
              <></>
            ) : (
              <option>{option}</option>
            )
          )}
        </Form.Control>
      </div>
    );
  }
}

export default InterestsEditor;
