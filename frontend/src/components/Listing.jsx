import React from 'react';
import PropTypes from 'prop-types';

function Listing ({ title, address, price, thumbnail, propertyType, numOfBathrooms, numOfBeds }) {
  console.log(title);
  console.log(address);
  console.log(price);
  console.log(thumbnail);
  console.log(propertyType);
  console.log(numOfBathrooms);
  console.log(numOfBeds);
  return (
    <>
      <div>
        {title}
        {propertyType}
        {numOfBeds}
        {numOfBathrooms}
        <img src={thumbnail} />
        {address}
        {price}
        {propertyType}
      </div>
    </>
  )
}

Listing.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  propertyType: PropTypes.string,
  numOfBathrooms: PropTypes.number,
  numOfBeds: PropTypes.number,
}

export default Listing;
