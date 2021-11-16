import React from 'react';
import { callFetch } from './Fetch'
import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

function ViewListing () {
  const id = useParams().id;
  const [title, setTitle] = React.useState('');
  const [addressStr, setAddressStr] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');
  const [numOfBathrooms, setNumOfBathrooms] = React.useState('');
  const [numOfBedrooms, setNumOfBedrooms] = React.useState('');
  const [numOfBeds, setNumOfBeds] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [reviews, setReviews] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  const [bookings, setBookings] = React.useState([]);
  const [createdBookings, setCreatedBookings] = React.useState({});
  const [openMakeBooking, setOpenMakeBooking] = React.useState(false);
  const [openViewBookings, setOpenViewBookings] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [bookingPrice, setBookingPrice] = React.useState('');
  const [showBookingPrice, setShowBookingPrice] = React.useState(false);
  // const [errorMsg, setErrorMsg] = React.useState('');
  // const navigate = useNavigate();

  const handleClickOpenMakeBooking = () => {
    setOpenMakeBooking(true);
  };

  const handleCloseMakeBooking = () => {
    setOpenMakeBooking(false);
  };

  const handleClickOpenViewBookings = () => {
    setOpenViewBookings(true);
  };

  const handleCloseViewBookings = () => {
    setOpenViewBookings(false);
  };

  React.useEffect(async () => {
    const data = await callFetch('GET', `/listings/${id}`, undefined, false, false);
    const listing = data.listing;
    setTitle(listing.title);

    let addressStrCompile = '';
    (listing.address.street !== undefined) && (addressStrCompile += listing.address.street + ' ');
    (listing.address.city !== undefined) && (addressStrCompile += listing.address.city + ' ');
    (listing.address.state !== undefined) && (addressStrCompile += listing.address.state + ' ');
    (listing.address.postcode !== undefined) && (addressStrCompile += listing.address.postcode + ' ');
    (listing.address.country !== undefined) && (addressStrCompile += listing.address.country + ' ');

    setAddressStr(addressStrCompile);
    console.log(listing);
    setAmenities(listing.metadata.amenities);
    setPrice(listing.price);

    setImages(listing.metadata.images);
    console.log(listing.metadata.images);
    setPropertyType(listing.metadata.propertyType);
    setReviews(listing.reviews);
    // Implement this
    // TO-DO: setReviewRating();
    setNumOfBedrooms(listing.metadata.numOfBedrooms);
    setNumOfBeds(listing.metadata.numOfBeds);
    setNumOfBathrooms(listing.metadata.numOfBathrooms);
  }, [])

  React.useEffect(async () => {
    if (localStorage.getItem('curToken') !== null) {
      const bookingsData = await callFetch('GET', '/bookings', undefined, false, true);
      console.log(bookingsData.bookings);
      setBookings(bookingsData.bookings);
    }
  }, [])

  const addBooking = (date, from) => {
    const newCreatedBookings = createdBookings;
    newCreatedBookings[from] = date;
    setCreatedBookings(newCreatedBookings);
  }

  const calculateBookingPrice = () => {
    console.log(createdBookings);
    if (!createdBookings.start || isNaN((new Date(createdBookings.start).getTime()))) {
      setErrorMsg('Please enter a start date.');
    } else if (!createdBookings.end || isNaN((new Date(createdBookings.end).getTime()))) {
      setErrorMsg('Please enter a end date.');
    } else if ((new Date(createdBookings.end)) < (new Date(createdBookings.start))) {
      setErrorMsg('Please enter a valid date range.');
    } else {
      const startDate = new Date(createdBookings.start);
      const endDate = new Date(createdBookings.end);
      const dateDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.round(dateDiff / (1000 * 3600 * 24));
      const bookingPrice = daysDiff * price;
      setBookingPrice(bookingPrice);
      setErrorMsg('');
      setShowBookingPrice(true);
    }
  }

  const makeBooking = async () => {
    try {
      console.log(calculateBookingPrice);
      const body = {
        dateRange: {
          start: createdBookings.start,
          end: createdBookings.end,
        },
        totalPrice: bookingPrice
      }
      console.log(body);
      await callFetch('POST', `/bookings/new/${id}`, body, true, true);
      clearCreatedBooking();
    } catch (err) {
      setErrorMsg(err);
    }
  }

  const clearCreatedBooking = () => {
    setCreatedBookings({});
    setShowBookingPrice(false);
    setErrorMsg('');
    setOpenMakeBooking(false);
  }

  // console.log(images);
  // const imageList = !(images === '' || images === undefined) && images.map((image, idx) => {
  //   return {
  //     original: image,
  //     thumbnail: image
  //   }
  // })
  // console.log(imageList);
  return (
    <>
      <div>
        <h1 className='title-text'>{title}</h1>
        {(images === '' || images === undefined)
          ? <img src='data:image/png;base64,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' />
          : <Carousel width='50%'>
            {images.map((image, idx) => {
              return (
                <div key={idx}>
                  <img src={image} />
                </div>
              )
            })}
          </Carousel>
        }
        <div>Address: {addressStr}</div>
        <div>Amenities: {amenities}</div>
        <div>Price: {price}</div>
        {/* <div>Images: {images}</div> */}
        <div>Property type: {propertyType}</div>
        <div>Reviews: {reviews}</div>
        <div>Review rating: </div>
        <div>Number of bedrooms: {numOfBedrooms}</div>
        <div>Number of beds: {numOfBeds}</div>
        <div>Number of bathrooms: {numOfBathrooms}</div>
        { (localStorage.getItem('curToken') !== null) &&
          <>
          <Button variant='outlined' onClick={handleClickOpenMakeBooking}>
            Make Bookings
          </Button>
          <Dialog open={openMakeBooking} onClose={handleCloseMakeBooking}>
            <DialogTitle>Make Bookings</DialogTitle>
            <DialogContent>
              <br />
              {/* If email is not empty, only provide listings that belongs to the email */}
              <TextField
                id='date'
                label='Start'
                type='date'
                onBlur={e => (addBooking(e.target.value, 'start'))}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id='date'
                label='End'
                type='date'
                onBlur={e => (addBooking(e.target.value, 'end'))}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </DialogContent>
            {showBookingPrice &&
              <>The total price of the booking is {bookingPrice}. Would you like to confirm this booking?</>
            }
            {(errorMsg === '') ? <></> : (<div className='error-message'>{errorMsg}</div>)}
            <DialogActions>
              {showBookingPrice
                ? <Button onClick={makeBooking}>Confirm Booking</Button>
                : <Button onClick={calculateBookingPrice}>Check Price</Button>
              }
              <Button onClick={clearCreatedBooking}>Cancel</Button>
            </DialogActions>
          </Dialog>
          {bookings.length !== 0 &&
            <>
              <Button variant='outlined' onClick={handleClickOpenViewBookings}>
                View Bookings
              </Button>
              <Dialog open={openViewBookings} onClose={handleCloseViewBookings}>
                <DialogTitle>Make Bookings</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Email Address'
                    type='email'
                    fullWidth
                    variant='standard'
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseViewBookings}>Cancel</Button>
                  <Button onClick={handleCloseViewBookings}>Subscribe</Button>
                </DialogActions>
              </Dialog>
            </>
          }
          </>
        }
      </div>
    </>
  )
}

export default ViewListing;
