import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';
import ApiComponent from './ApiComponent'

class ListCreate extends ApiComponent {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    alert('A name was submitted: ' + JSON.stringify(this.state));
    this.makeApiCall('/api/list/create', this.state)
    event.preventDefault();
  }

  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages}/>
        <div className="row">
          <div className="col-sm-4">
            <div className="panel">
              <div className="panel-body">
                <h3>We will create lists here</h3>
                <p>You have no lists yet</p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">List Name:</label>
                      <input type="name" className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(ListCreate);
