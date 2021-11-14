import React from 'react';
import Grid from '@mui/material/Grid';
import Listing from './Listing';
import PropTypes from 'prop-types';

function Listings ({ email }) {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [listings, setListings] = React.useState([]);
  React.useEffect(async () => {
    try {
      const res = await fetch('http://localhost:5005/listings');
      if (!res.ok) {
        console.log(res.statusText);
        setErrorMsg('The email or password is incorrect.');
      } else {
        const data = await res.json();
        setListings(data.listings);
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  console.log(listings);

  return (
  <>
    {(errorMsg !== '')
      ? (<div className='error-message'>{errorMsg}</div>)
      : (
      <Grid container spacing={2}>
        {/* If email is not empty, only provide listings that belongs to the email */}
        {listings.map(({ title, address, price, thumbnail }, idx) => {
          // console.log(listing);
          console.log(title);
          console.log(address);
          console.log(price);
          console.log(thumbnail);
          return (
            <Grid item xs={3} key={idx}>
              <Listing title={title} address={address.address} price={price} thumbnail={thumbnail} propertyType={address.propertyType} numOfBathrooms={address.numOfBathrooms} numOfBeds={address.numOfBeds} />
            </Grid>
          )
        })}
      </Grid>
        )}
  </>)
}

Listings.propTypes = {
  email: PropTypes.string
}

export default Listings;
