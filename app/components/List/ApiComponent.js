import React from 'react';

class ApiComponent extends React.Component {
  makeApiCall(path, params) {
    return $.post(path, $.extend(params, {token: window.INITIAL_STATE.auth.token}))
  }
}

export default ApiComponent;
