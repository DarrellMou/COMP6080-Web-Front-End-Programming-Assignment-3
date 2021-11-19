import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
// import Listing from './Listing';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { callFetch } from './Fetch'
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import YourListing from './YourListing';
import GeneralListing from './GeneralListing';
// import TextField from '@mui/material/TextField';

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function useWindowDimensions () {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

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
  const [showClearFilter, setShowClearFilter] = React.useState(false);

  const { width } = useWindowDimensions();
  const xs = Math.round(12 / (width / 400));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterListings = () => {
    const newList = allListings.filter((l) => {
      if (locationSearch !== '') {
        const titleLocations = locationSearch.split(' ');
        const oldLength = titleLocations.length;
        const filteredTL = titleLocations.filter((tl) => {
          const pattern = new RegExp(tl, 'i');
          if (l.title.match(pattern)) {
            return false;
          }
          if (l.address.city && l.address.city.match(pattern)) {
            return false;
          }
          if (l.address.state && l.address.state.match(pattern)) {
            return false;
          }
          if (l.address.postcode && l.address.postcode.match(pattern)) {
            return false;
          }
          if (l.address.country && l.address.country.match(pattern)) {
            return false;
          }
          if (l.address.street && l.address.street.match(pattern)) {
            return false;
          }
          return true;
        })
        if (oldLength === filteredTL.length) {
          return false;
        }
      }
      if (minBedroomSearch !== '') {
        if (l.metadata.numOfBeds && minBedroomSearch > l.metadata.numOfBeds) {
          return false;
        }
      }
      if (maxBedroomSearch !== '') {
        if (l.metadata.numOfBeds && maxBedroomSearch < l.metadata.numOfBeds) {
          return false;
        }
      }
      if (startDateSearch !== '') {
        const startDate = new Date(startDateSearch);
        const oldLength = l.availability.length;
        const filteredA = l.availability.filter((a) => new Date(a.start) < startDate)
        if (oldLength === filteredA.length) {
          return false;
        }
      }
      if (endDateSearch !== '') {
        const endDate = new Date(endDateSearch);
        const oldLength = l.availability.length;
        const filteredA = l.availability.filter((a) => new Date(a.end) > endDate)
        if (oldLength === filteredA.length) {
          return false;
        }
      }
      if (minPrice !== '') {
        if (parseInt(minPrice) > parseInt(l.price)) {
          return false;
        }
      }
      if (maxPrice !== '') {
        if (parseInt(maxPrice) < parseInt(l.price)) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sort === 1) {
        return 1;
      } else if (sort === 2 || sort === 3) {
        let ascending = 1;
        if (sort === 3) {
          ascending = -1;
        }
        if (a.reviews.length === 0 && b.reviews.length === 0) {
          return 1;
        } else if (b.reviews.length === 0) {
          return ascending;
        } else if (a.reviews.length === 0) {
          return -ascending;
        } else {
          const aReview = a.reviews.reduce((c, d) => c + d.rating, 0) / a.reviews.length;
          const bReview = b.reviews.reduce((c, d) => c + d.rating, 0) / b.reviews.length;
          if (aReview < bReview) {
            return -ascending;
          } else {
            return ascending;
          }
        }
      }
      return 1;
    })
    setListings(newList);
    handleClose();
    setSort('');
    setShowClearFilter(true);
  };

  React.useEffect(async () => {
    let mounted = true;
    try {
      let ownerBookings = [];
      if (localStorage.getItem('curToken') !== null) {
        const ownerEmail = localStorage.getItem('curEmail');
        const bookingsData = await callFetch('GET', '/bookings', undefined, false, true);
        ownerBookings = bookingsData.bookings.filter((b) => {
          if (b.owner === ownerEmail) {
            return true;
          }
          return false;
        })
      }

      const data = await callFetch('GET', '/listings', undefined, false, false);
      const lId = data.listings.map((l, idx) => {
        return l.id;
      });
      const promises = lId.map((id) => callFetch('GET', `/listings/${id}`, undefined, false, false));
      Promise.all(promises)
        .then((newListing) => {
          const listings = newListing.map((l) => l.listing);
          const newList = listings.filter((l, idx) => {
            l.id = lId[idx];
            const bookings = ownerBookings.filter(b => parseInt(b.listingId) === parseInt(l.id));
            l.bookings = bookings;
            if (l.availability.length === 0) {
              return false;
            }
            return true;
          })
          return newList;
        }).then((publishedListings) => {
          const listingsOrdered = publishedListings.sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => {
            return ((b.bookings.length !== 0) ? 1 : (a.bookings.length !== 0) ? -1 : 1);
          });
          if (mounted) {
            setAllListings(listingsOrdered);
            setListings(listingsOrdered);
          }
        })
        .catch(error => setErrorMsg(error));
    } catch (error) {
      setErrorMsg(error);
    }
    return () => { mounted = false };
  }, [])

  return (
  <>
    {(errorMsg !== '')
      ? (<div className='error-message'>{errorMsg}</div>)
      : (
      <>
        <br />
        <Button variant="outlined" onClick={handleClickOpen}>
          Search Filters
        </Button>
        {showClearFilter && <Button variant="outlined" onClick={() => {
          setListings(allListings);
          setShowClearFilter(false);
        }}>
          Clear Filters
        </Button>}
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
              <Form.Group className="mb-3" controlId="formSearch">
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
              <Form.Select value={sort} onChange={e => setSort(parseInt(e.target.value))}>
                <option value="1">Alphabetically</option>
                <option value="2">Reviews Ascending</option>
                <option value="3">Reviews Descending</option>
              </Form.Select>
            </Form>
            <DialogActions>
              <button id="search-button" className="btn btn-outline-primary my-2 my-sm-0" onClick={filterListings}>Search</button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <br />
        <br />
        <Grid container spacing={2}>
          {listings.map((l, idx) => {
            return (
              <Grid item xs={xs} key={idx}>
                <GeneralListing listing={l} />
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

  const { width } = useWindowDimensions();
  const xs = Math.round(12 / (width / 400));

  React.useEffect(async () => {
    let mounted = true;
    const ownerEmail = localStorage.getItem('curEmail');
    try {
      const data = await callFetch('GET', '/listings', undefined, false, false);
      const listings = data.listings.filter((l) => l.owner === ownerEmail);
      const listingsOrdered = [...listings].sort((a, b) => a.title.localeCompare(b.title));
      if (mounted) setListings(listingsOrdered);
    } catch (error) {
      setErrorMsg(error);
    }
    return () => { mounted = false };
  }, [])

  return (
  <>
    {(errorMsg !== '')
      ? (<div className='error-message'>{errorMsg}</div>)
      : (
      <Grid container spacing={2}>
        {listings.map((l, idx) => {
          return (
            <Grid item xs={xs} key={idx}>
              <YourListing listing={l} />
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
