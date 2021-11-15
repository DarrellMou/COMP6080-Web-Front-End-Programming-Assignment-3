import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import Listing from './Listing';
import { callFetch } from './Fetch'
import { useNavigate } from 'react-router-dom';

export function AllListings () {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [listings, setListings] = React.useState([]);
  React.useEffect(async () => {
    try {
      const data = await callFetch('GET', '/listings', undefined, false, false);
      const promiseList = data.listings.map(async (l) => {
        return callFetch('GET', `/listings/${l.id}`, undefined, false, false);
      })
      Promise.all(promiseList)
        .then((myList) => {
          const a = myList.map((l) => {
            return l.listing;
          });
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

export function MyListings () {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [listings, setListings] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(async () => {
    const ownerEmail = localStorage.getItem('curEmail');
    try {
      const data = await callFetch('GET', '/listings', undefined, false, false);
      const listings = data.listings.filter((l) => l.owner === ownerEmail);
      const promiseList = listings.map(async (l) => {
        return callFetch('GET', `/listings/${l.id}`, undefined, false, false);
      })
      Promise.all(promiseList)
        .then((myList) => {
          const a = myList.map((l) => {
            return l.listing;
          });
          setListings(a);
        });
    } catch (error) {
      setErrorMsg(error);
    }
  }, [])
  const MoveToCreateListing = () => {
    navigate('/createlisting');
  }

  return (
  <>
    {(errorMsg !== '')
      ? (<div className='error-message'>{errorMsg}</div>)
      : (
      <Grid container spacing={2}>
        {/* If email is not empty, only provide listings that belongs to the email */}
        {listings.map(({ title, address, price, thumbnail, metadata }, idx) => {
          return (
            <Grid item xs={3} key={idx}>
              <Listing title={title} address={address} price={price} thumbnail={thumbnail} metadata={metadata} />
            </Grid>
          )
        })}
      </Grid>
        )}
    <Button variant='outlined' startIcon={<CreateIcon />} onClick={MoveToCreateListing}>
      Create
    </Button>
  </>)
}
