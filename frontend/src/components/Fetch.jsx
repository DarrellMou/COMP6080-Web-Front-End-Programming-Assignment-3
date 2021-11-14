// import PropTypes from 'prop-types';

export function callFetch (method, path, body, hasContentType, hasToken) {
  const header = {}
  if (hasContentType) {
    header['Content-Type'] = 'application/json'
  }
  if (hasToken) {
    const token = localStorage.getItem('curToken');
    header.Authorization = `Bearer ${token}`
  }
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5005${path}`, {
      method: method,
      headers: header,
      body: JSON.stringify(body)
    })
      .then((response) => {
        if (response.ok) {
          response.json().then(data => {
            resolve(data);
          });
        } else {
          response.json().then(errorMsg => {
            reject(errorMsg.error);
            console.log(errorMsg);
          });
        }
      })
      .catch((err) => console.log(err));
  });
}
