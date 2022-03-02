import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as reduxAction from '../../redux/store/actions/index';
import { checkValidity } from '../../shared/utility';

const Auth = props => {

  const [authForm, setAuthForm] = useState({

    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'E-Mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }

  });

  const [isSignup, setIsSignup] = useState(true);
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updateControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation),
        touched: true
      }
    }
    setAuthForm(updateControls)
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignup
    )
  }





  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    })
  }

  let form = formElementsArray.map(formElement => (

    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shuldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));
  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = (<p> {props.error.message} </p>)
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }


  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button
        clicked={switchAuthModeHandler}
        btnType="Danger">GO TO SIGN{isSignup ? 'IN' : 'UP'}</Button>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token != null,
    buildingBurger: state.burgerReducer.building,
    authRedirectPath: state.authReducer.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(reduxAction.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(reduxAction.setAuthRedirectPath('/'))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);