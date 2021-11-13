import React from 'react';
import Grid from '@mui/material/Grid';
import Listing from './Listing';
import PropTypes from 'prop-types';

function Listings ({ token }) {
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
        {/* {listings.map(({ title, address, price, thumbnail, propertyType, numOfBathrooms, propertyBedrooms, propertyAmenities }, idx) => {
          // console.log(listing);
          console.log(title);
          console.log(address);
          console.log(price);
          console.log(thumbnail);
          return (
            <Grid item xs={4} key={idx}>
              <Listing title={title} address={address} price={price} thumbnail={thumbnail} propertyType={propertyType} numOfBathrooms={numOfBathrooms} propertyBedrooms={propertyBedrooms} propertyAmenities={propertyAmenities}/>
            </Grid>
          )
        })} */}
        {listings.map((listing, idx) => {
          console.log(listing);
          console.log(listing.address);
          return (
            <Grid item xs={4} key={idx}>
              {/* listing.address is an object, and apparently you cannot pass in objects into props. DEAL WITH THIS!! */}
              <Listing title={listing.title} address={listing.address} price={listing.price} thumbnail={listing.thumbnail} propertyType={listing.propertyType} numOfBathrooms={listing.numOfBathrooms} propertyBedrooms={listing.propertyBedrooms} propertyAmenities={listing.propertyAmenities}/>
            </Grid>
          )
        })}
      </Grid>
        )}
  </>)
}

Listings.propTypes = {
  token: PropTypes.string
}

export default Listings;
