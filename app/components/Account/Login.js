import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import Messages from '../Messages';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
  }

  handleFacebook() {
    this.props.dispatch(facebookLogin())
  }

  handleTwitter() {
    this.props.dispatch(twitterLogin())
  }

  handleGoogle() {
    this.props.dispatch(googleLogin())
  }

  handleVk() {
    this.props.dispatch(vkLogin())
  }

  handleGithub() {
    this.props.dispatch(githubLogin())
  }

  render() {
    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <div className="btn-toolbar text-center">
              <button onClick={this.handleTwitter.bind(this)} className="btn btn-twitter">Sign in with Twitter</button>
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

export default connect(mapStateToProps)(Login);
