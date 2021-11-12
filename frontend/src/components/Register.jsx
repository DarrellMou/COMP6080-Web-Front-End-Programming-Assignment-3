import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'

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
        await fetch('http://localhost:5005/user/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            name: name,
            password: password
          })
        }).then(err => err.json()).then((erro) => {
          throw erro.error;
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMsg('Passwords do not match.');
    }
  }
  const isToken = token === '';
  return (
    <>
      { isToken
        ? (
        <div className={ `${(token !== '') ? 'active' : ''} show`}>
          <div className="register-form">
            <div className="form-box solid">
              <form>
                <h1 className="register-text">Sign Up</h1>
                <label>email</label><br></br>
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
                {(errorMsg === '')
                  ? ''
                  : (<div className="error-message">
                    {errorMsg}
                </div>)}
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
  setToken: PropTypes.func
}

export default register;
