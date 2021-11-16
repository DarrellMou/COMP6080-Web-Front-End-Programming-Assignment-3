import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import Listing from './Listing';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { callFetch } from './Fetch'
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
// import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AllListings () {
  const [errorMsg, setErrorMsg] = React.useState('');
  const [listings, setListings] = React.useState([]);
  const [locationSearch, setLocationSearch] = React.useState('');
  const [minBedroomSearch, setMinBedroomSearch] = React.useState('');
  const [maxBedroomSearch, setMaxBedroomSearch] = React.useState('');
  const [startDateSearch, setStartDateSearch] = React.useState('');
  const [endDateSearch, setEndDateSearch] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [sort, setSort] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterListings = () => {
    // const lId = listings.map((l) => l.id);
    // callFetch('GET', `/listings/${l.id}`, undefined, false, false);
    const a = new Promise((resolve) => {
      const b = listings.filter(async (l) => {
        console.log('a');
        const data = await callFetch('GET', `/listings/${l.id}`, undefined, false, false);
        console.log('b');
        const listing = data.listing;
        if (locationSearch !== '') {
          const pattern = new RegExp(locationSearch, 'i');
          // console.log(pattern);
          if (!listing.title.match(pattern)) {
            // console.log('in ' + listing.title);
            return false;
          }
          // console.log('out ' + listing.title);
        }
        return true;
      })
      resolve(b);
    });
    a.then((newListing) => {
      console.log('c');
      console.log(newListing);
    });
    // setListings(newListing);
    console.log(locationSearch);
    console.log(minBedroomSearch);
    console.log(maxBedroomSearch);
    console.log(startDateSearch);
    console.log(endDateSearch);
    console.log(minPrice);
    console.log(maxPrice);
    console.log(sort);
  };

  React.useEffect(async () => {
    try {
      const ownerEmail = localStorage.getItem('curEmail');
      const data = await callFetch('GET', '/listings', undefined, false, false);
      const listingsOrdered = [...data.listings].sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => {
        return (b.owner === ownerEmail) ? 1 : ((a.owner === ownerEmail) ? -1 : 1);
      });
      setListings(listingsOrdered);
    } catch (error) {
      setErrorMsg(error);
    }
  }, [])

  return (
  <>
    {(errorMsg !== '')
      ? (<div className='error-message'>{errorMsg}</div>)
      : (
      <>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
          Search Filter
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Search Filter</DialogTitle>
          <DialogContent>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control onBlur={e => setLocationSearch(e.target.value)} type="text" placeholder="Castle on the moon" />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Min Bedrooms</Form.Label>
                  <Form.Control onBlur={e => setMinBedroomSearch(e.target.value)} type="number" placeholder="0" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Max Bedrooms</Form.Label>
                  <Form.Control onBlur={e => setMaxBedroomSearch(e.target.value)} type="number" placeholder="0" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Check In</Form.Label>
                  <Form.Control
                    id="date"
                    type="date"
                    onBlur={e => setStartDateSearch(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Check Out</Form.Label>
                  <Form.Control
                    id="date"
                    type="date"
                    onBlur={e => setEndDateSearch(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control onBlur={e => setMinPrice(e.target.value)} type="number" placeholder="$" />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control onBlur={e => setMaxPrice(e.target.value)} type="number" placeholder="$" />
                </Form.Group>
              </Row>
              <Form.Label>Sort</Form.Label>
              <Form.Select onChange={e => setSort(e.target.value)}>
                <option value="1">Alphabetically</option>
                <option value="2">Reviews Ascending</option>
                <option value="3">Reviews Descending</option>
              </Form.Select>
            </Form>
            <DialogActions>
              <button className="btn btn-outline-primary my-2 my-sm-0" onClick={filterListings}>Search</button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <br />
        <br />
        <Grid container spacing={2}>
          {/* If email is not empty, only provide listings that belongs to the email */}
          {listings.map((l, idx) => {
            return (
              <Grid item xs={3} key={idx}>
                <Listing listing={l} isYourListing={false} />
              </Grid>
            )
          })}
        </Grid>
      </>
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
      setListings(listingsOrdered);
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
              <Listing listing={l} isYourListing={true} />
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
