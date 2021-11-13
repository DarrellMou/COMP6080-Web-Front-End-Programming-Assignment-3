import React from 'react';
import PropTypes from 'prop-types';

function Listing ({ title, address, price, thumbnail, propertyType, numOfBathrooms, propertyBedrooms, propertyAmenities }) {
  return (
    <>
      <div>
        {title}
        {address}
        {price}
        <img src={thumbnail} />
        {propertyType}
        {numOfBathrooms}
        {propertyBedrooms}
        {propertyAmenities}
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
  propertyBedrooms: PropTypes.number,
  propertyAmenities: PropTypes.string
}

export default Listing;
