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
      const ownerEmail = localStorage.getItem('curEmail');
      const data = await callFetch('GET', '/listings', undefined, false, false);
      const listingsOrdered = [...data.listings].sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => {
        return (b.owner === ownerEmail) ? 1 : ((a.owner === ownerEmail) ? -1 : 1);
      });
      setListings(listingsOrdered.map(l => l.id));
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
        {listings.map((l, idx) => {
          return (
            <Grid item xs={3} key={idx}>
              <Listing listingId={l} isYourListing={false} />
            </Grid>
          )
        })}
      </Grid>
        )}
  </>)
}

export function YourListings () {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [listings, setListings] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(async () => {
    const ownerEmail = localStorage.getItem('curEmail');
    try {
      const data = await callFetch('GET', '/listings', undefined, false, false);
      const listings = data.listings.filter((l) => l.owner === ownerEmail);
      const listingsOrdered = [...listings].sort((a, b) => a.title.localeCompare(b.title));
      setListings(listingsOrdered.map(l => (l.id)));
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
        {listings.map((l, idx) => {
          return (
            <Grid item xs={3} key={idx}>
              <Listing listingId={l} isYourListing={true} />
            </Grid>
          )
        })}
      </Grid>
        )}
    <br />
    <br />
    <Button variant='outlined' startIcon={<CreateIcon />} onClick={() => { navigate('/createlisting') }}>
      Create
    </Button>
  </>)
}
