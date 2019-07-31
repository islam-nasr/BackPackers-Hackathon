import React, { Component } from "react";
import { Button, Form, Table, Modal, Col, Row } from "react-bootstrap";

class TransporationEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorShown: false,
      transportations: this.props.transportations
        ? this.props.transportations
        : [],
      from: "",
      to: "",
      by: "",
      departureTime: "",
      arrivalTime: "",
      readOnly: this.props.readOnly ? true : false
    };
  }
  addTransportation() {
    let transportations = [
      ...this.state.transportations,
      {
        from: this.state.from,
        to: this.state.to,
        by: this.state.by,
        departureTime: this.state.departureTime,
        arrivalTime: this.state.arrivalTime
      }
    ];
    this.setState({
      transportations: transportations,
      selectorShown: false,
      from: "",
      to: "",
      by: "",
      departureTime: "",
      arrivalTime: ""
    });
    if (this.props.onTransportationsChanged) {
      this.props.onTransportationsChanged(transportations);
    }
  }
  removeTransportation(i) {
    this.state.transportations.splice(i, 1);
    this.setState({ transportations: this.state.transportations });
    if (this.props.onTransportationsChanged) {
      this.props.onTransportationsChanged(this.state.transportations);
    }
  }
  render() {
    let i = 0;
    return (
      <div>
        <Modal
          show={this.state.selectorShown}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={e => this.setState({ selectorShown: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Select a place
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.from}
                      onChange={e => this.setState({ from: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.to}
                      onChange={e => this.setState({ to: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Departure time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={this.state.departureTime}
                      onChange={e =>
                        this.setState({ departureTime: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Arrival time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={this.state.arrivalTime}
                      onChange={e =>
                        this.setState({ arrivalTime: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>By</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.by}
                  onChange={e => this.setState({ by: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={e => this.addTransportation()}>Add</Button>{" "}
            <Button onClick={e => this.setState({ selectorShown: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {!this.state.readOnly && (
          <p>
            <Button
              variant="info"
              onClick={e => this.setState({ selectorShown: true })}
            >
              Add Transporation
            </Button>
          </p>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Departure time</th>
              <th>Arrival time</th>
              <th>By</th>
              {!this.state.readOnly && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {this.state.transportations.map(transportation => (
              <tr>
                <td>{transportation.from}</td>
                <td>{transportation.to}</td>
                <td>
                  <Form.Control
                    type="datetime-local"
                    readOnly
                    value={transportation.departureTime.substring(0, 21)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="datetime-local"
                    readOnly
                    value={transportation.arrivalTime.substring(0, 21)}
                  />
                </td>
                <td>{transportation.by}</td>
                {!this.state.readOnly && (
                  <td>
                    <Button
                      style={{ marginBottom: "5px" }}
                      variant="outline-danger"
                      size="sm"
                      onClick={e => this.removeTransportation(i)}
                    >
                      Remove
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TransporationEditor;
