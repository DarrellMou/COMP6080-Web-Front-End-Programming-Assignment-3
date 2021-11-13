import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function Login ({ token, setToken }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const submitLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5005/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!res.ok) {
        console.log(res.statusText);
        setErrorMsg('The email or password is incorrect.');
      } else {
        const data = await res.json();
        setToken(data.token);
        <Navigate to="/"/>
      }
    } catch (error) {
      console.log(error);
    }
  }
  const isToken = token === '';
  return (
    <>
      { isToken
        ? (
        <div className={ 'show' }>
          <div className="login-form">
            <div className="form-box solid">
              <form>
                <h1 className="login-text">Sign In</h1>
                <label>Email</label><br></br>
                <input
                  type="text"
                  name="email"
                  className="login-box"
                  onBlur={e => setEmail(e.target.value)}
                /><br></br>
                <label>Password</label><br></br>
                <input
                  type="password"
                  name="password"
                  className="login-box"
                  onBlur={e => setPassword(e.target.value)}
                /><br></br>
                {(errorMsg === '') ? <></> : (<div className="error-message">{errorMsg}</div>)}
                <button onClick={submitLogIn}>Log in</button>
              </form>
            </div>
          </div>
        </div>)
        : <Navigate to="/"/> }
    </>
  );
}

Login.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func
}

export default Login;
