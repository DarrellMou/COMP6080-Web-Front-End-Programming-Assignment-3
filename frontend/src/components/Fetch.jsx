// import PropTypes from 'prop-types';
// import token from '../App';

// function callFetch ({ method, path, body, hasContentType, hasToken }) {
//   console.log(method);
//   console.log(path);
//   console.log(body);
//   console.log(hasContentType);
//   console.log(hasToken);
//   const header = {}
//   if (hasContentType) {
//     header['Content-Type'] = 'application/json'
//   }
//   if (hasToken) {
//     header.Authorization = `Bearer ${token}`
//   }
//   return fetch(`http://localhost:5005${path}`, {
//     method: method,
//     header: header,
//     body: JSON.stringify(body)
//   });
// }

// callFetch.propTypes = {
//   method: PropTypes.string,
//   path: PropTypes.string,
//   body: PropTypes.object,
//   hasContentType: PropTypes.bool,
//   hasToken: PropTypes.bool
// }

// export default callFetch;
