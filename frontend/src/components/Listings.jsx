import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Listing from './Listing';
import { callFetch } from './Fetch'

export function AllListings () {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [listings, setListings] = React.useState([]);
  React.useEffect(async () => {
    try {
      const data = await callFetch('GET', '/listings', undefined, false, false);
      setListings(data.listings);
    } catch (error) {
      setErrorMsg(error);
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

export function MyListings ({ token }) {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [listings, setListings] = React.useState([]);
  React.useEffect(async () => {
    const ownerEmail = localStorage.getItem('curEmail');
    try {
      const data = await callFetch('GET', '/listings', undefined, false, false);
      console.log(localStorage);
      console.log(ownerEmail);
      const listings = data.listings.filter((l) => l.owner === ownerEmail);
      console.log(listings);
      const promiseList = listings.map(async (l) => {
        return callFetch('GET', `/listings/${l.id}`, undefined, false, false);
      })
      console.log(promiseList);
      Promise.all(promiseList)
        .then((myList) => {
          console.log(myList);
          const a = myList.map((l) => {
            console.log(l.listing);
            return l.listing;
          });
          console.log(a);
          setListings(a);
        });
    } catch (error) {
      setErrorMsg(error);
    }
  }, [])

  return (
  <>
    {(errorMsg !== '')
      ? (<div className='error-message'>{errorMsg}</div>)
      : (
      <Grid container spacing={2}>
        {/* If email is not empty, only provide listings that belongs to the email */}
        {listings.map(({ title, address, price, thumbnail, metadata }, idx) => {
          console.log(listings);
          return (
            <Grid item xs={3} key={idx}>
              <Listing title={title} address={address} price={price} thumbnail={thumbnail} metadata={metadata} />
            </Grid>
          )
        })}
      </Grid>
        )}
  </>)
}

MyListings.propTypes = {
  token: PropTypes.string
}
