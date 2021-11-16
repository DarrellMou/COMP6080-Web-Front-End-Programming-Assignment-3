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
  const [allListings, setAllListings] = React.useState([]);
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
    const lId = allListings.map((l, idx) => {
      return l.id;
    });
    const promises = lId.map((id) => callFetch('GET', `/listings/${id}`, undefined, false, false));
    Promise.all(promises)
      .then((newListing) => {
        const newList = newListing.filter((l, idx) => {
          const listing = l.listing;
          listing.id = lId[idx];
          if (locationSearch !== '') {
            const titleLocations = locationSearch.split(' ');
            const oldLength = titleLocations.length;
            const filteredTL = titleLocations.filter((tl) => {
              const pattern = new RegExp(tl, 'i');
              if (listing.title.match(pattern)) {
                return false;
              }
              if (listing.address.city && listing.address.city.match(pattern)) {
                return false;
              }
              if (listing.address.state && listing.address.state.match(pattern)) {
                return false;
              }
              if (listing.address.postcode && listing.address.postcode.match(pattern)) {
                return false;
              }
              if (listing.address.country && listing.address.country.match(pattern)) {
                return false;
              }
              if (listing.address.street && listing.address.street.match(pattern)) {
                return false;
              }
              return true;
            })
            if (oldLength === filteredTL.length) {
              return false;
            }
          }
          if (minBedroomSearch !== '') {
            if (listing.metadata.numOfBeds && minBedroomSearch > listing.metadata.numOfBeds) {
              return false;
            }
          }
          if (maxBedroomSearch !== '') {
            if (listing.metadata.numOfBeds && maxBedroomSearch < listing.metadata.numOfBeds) {
              return false;
            }
          }
          if (startDateSearch !== '') {
            const startDate = new Date(startDateSearch);
            const oldLength = listing.availability.length;
            const filteredA = listing.availability.filter((a) => new Date(a.start) < startDate)
            if (oldLength === filteredA.length) {
              return false;
            }
          }
          if (endDateSearch !== '') {
            const endDate = new Date(endDateSearch);
            const oldLength = listing.availability.length;
            const filteredA = listing.availability.filter((a) => new Date(a.end) > endDate)
            if (oldLength === filteredA.length) {
              return false;
            }
          }
          if (minPrice !== '') {
            if (parseInt(minPrice) > parseInt(listing.price)) {
              return false;
            }
          }
          if (maxPrice !== '') {
            if (parseInt(maxPrice) < parseInt(listing.price)) {
              return false;
            }
          }
          return true;
        })
        // const orderedNewList = newList.sort((a, b) => {
        //   if (sort === 1) {
        //     return -1;
        //   }
        //   if (sort === 2) {
        //     return -1;
        //   }
        // })
        return newList.map(l => l.listing);
      })
      .then((newListing) => {
        setListings(newListing);
        handleClose();
      });
    console.log(sort);
  };

  React.useEffect(async () => {
    try {
      const ownerEmail = localStorage.getItem('curEmail');
      const data = await callFetch('GET', '/listings', undefined, false, false);
      const listingsOrdered = [...data.listings].sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => {
        return (b.owner === ownerEmail) ? 1 : ((a.owner === ownerEmail) ? -1 : 1);
      });
      setAllListings(listingsOrdered);
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
        <row>
          <Button variant="outlined" onClick={handleClickOpen}>
            Search Filters
          </Button>
          <Button variant="outlined" onClick={() => setListings(allListings)}>
            Clear Filters
          </Button>
        </row>
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
                <Form.Label>Search</Form.Label>
                <Form.Control onBlur={e => setLocationSearch(e.target.value)} type="text" placeholder="Title/Location" />
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
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Check Out</Form.Label>
                  <Form.Control
                    id="date"
                    type="date"
                    onBlur={e => setEndDateSearch(e.target.value)}
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
    <Button variant='outlined' startIcon={<CreateIcon />} onClick={() => { navigate('/listing/createlisting') }}>
      Create
    </Button>
  </>)
}
