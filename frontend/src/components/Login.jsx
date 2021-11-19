import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { callFetch } from './Fetch'

export default function Login ({ setIsTokenEmpty }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const submitLogIn = async (e) => {
    e.preventDefault();
    try {
      const data = await callFetch('POST', '/user/auth/login', {
        email: email,
        password: password
      }, true, false);
      localStorage.setItem('curToken', data.token);
      localStorage.setItem('curEmail', email);
      setIsTokenEmpty(false);
      setErrorMsg('');
    } catch (error) {
      setErrorMsg(error);
    }
  }
  return (
    <>
      { (localStorage.getItem('curToken') === null)
        ? (
        <div className={ 'show' }>
          <div className="login-form">
            <div className="form-box solid">
              <form>
                <h1 className="login-text">Sign In</h1>
                <label>Email</label>
                <LoginForm formName="Email" formType="text" className="login-box" onBlur={e => setEmail(e.target.value)}/>
                <br></br>
                <label>Password</label>
                <LoginForm formName="Password" formType="password" className="login-box" onBlur={e => setPassword(e.target.value)}/>
                {(errorMsg === '') ? <></> : (<div className="error-message">{errorMsg}</div>)}
                <br></br>
                <LoginButton onClick={submitLogIn} text="Login" />
              </form>
            </div>
          </div>
        </div>)
        : <Navigate to="/"/> }
    </>
  );
}

export const LoginForm = ({ formName, formType, className, onBlur }) => {
  return (
    <input
      type={formType}
      name={formName}
      className={className}
      onBlur={onBlur}
    />
  )
}

export const LoginButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

Login.propTypes = {
  setIsTokenEmpty: PropTypes.func,
}

LoginForm.propTypes = {
  formName: PropTypes.string,
  formType: PropTypes.string,
  className: PropTypes.string,
  onBlur: PropTypes.func,
}

LoginButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
}
