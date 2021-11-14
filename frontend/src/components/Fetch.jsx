// import PropTypes from 'prop-types';

export function callFetch (method, path, body, hasContentType, hasToken) {
  console.log(method);
  console.log(path);
  console.log(hasContentType);
  console.log(hasToken);
  console.log(JSON.stringify(body));
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
            console.log('1');
            console.log(errorMsg);
          });
        }
      })
      .catch((err) => console.log(err));
  });
}

// callFetch.propTypes = {
//   method: PropTypes.string,
//   path: PropTypes.string,
//   body: PropTypes.object,
//   hasContentType: PropTypes.bool,
//   hasToken: PropTypes.bool
// }
