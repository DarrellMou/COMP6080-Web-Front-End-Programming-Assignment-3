import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'
import { callFetch } from './Fetch'

function register ({ token }) {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const submitRegister = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      try {
        const body = {
          email: email,
          name: name,
          password: password
        }
        await callFetch('POST', '/user/auth/register', body, true, false);
        setErrorMsg('');
      } catch (err) {
        setErrorMsg(err);
      }
    } else {
      setErrorMsg('Passwords do not match.');
    }
  }
  const isToken = (token === '');
  return (
    <>
      { isToken
        ? (
        <div className={ `${(token !== '') ? 'active' : ''} show`}>
          <div className="register-form">
            <div className="form-box solid">
              <form>
                <h1 className="register-text">Sign Up</h1>
                <label>Email</label><br></br>
                <input
                  type="text"
                  name="email"
                  className="register-box"
                  onBlur={e => setEmail(e.target.value)}
                /><br></br>
                <label>Name</label><br></br>
                <input
                  type="text"
                  name="name"
                  className="register-box"
                  onBlur={e => setName(e.target.value)}
                /><br></br>
                <label>Password</label><br></br>
                <input
                  type="password"
                  name="password"
                  className="register-box"
                  onBlur={e => setPassword(e.target.value)}
                /><br></br>
                <label>Confirm Password</label><br></br>
                <input
                  type="password"
                  name="confirmPassword"
                  className="register-box"
                  onBlur={e => setConfirmPassword(e.target.value)}
                /><br></br>
                {(errorMsg === '') ? <></> : (<div className="error-message">{errorMsg}</div>)}
                <button onClick={submitRegister}>Sign up</button>
              </form>
            </div>
          </div>
        </div>)
        : <Navigate to="/"/> }
    </>
  );
}

register.propTypes = {
  token: PropTypes.string,
}

export default register;
