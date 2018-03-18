import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validateListFields, validateListFieldsSuccess, validateListFieldsFailure } from '../actions/lists';
import { createList, createListSuccess, createListFailure, resetNewList } from '../actions/lists';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a Title';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(validateListFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (response.payload.status != 200 || data.name ) {
        //let other components know of error by updating the redux` state
        dispatch(validateListFieldsFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validateListFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateList = (values, dispatch) => {
  return dispatch(createList(values))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createListFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createListSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
}



class CreateListForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newList.list && !nextProps.newList.error) {
      this.context.router.push('/');
    }
  }

  renderError(newPost) {
    if (newList && newList.error && newList.error.message) {
      return (
        <div className="alert alert-danger">
          { newList ? newList.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  render() {
    const {handleSubmit, submitting, newList} = this.props;
    return (
      <div className='container'>
        { this.renderError(newList) }
        <form onSubmit={ handleSubmit(validateAndCreateList) }>
          <Field
                 name="name"
                 type="text"
                 component={ renderField }
                 label="Name*" />
          <div>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </button>
            <Link
                  to="/"
                  className="btn btn-error"> Cancel
            </Link>
          </div>
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'CreateListForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate
})(CreateListForm)