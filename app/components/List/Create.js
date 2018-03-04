import React from 'react';
import { connect } from 'react-redux'
import Messages from '../Messages';

class ListCreate extends React.Component {
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
                <a href="/create" role="button" className="btn btn-default">Create New List</a>
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
