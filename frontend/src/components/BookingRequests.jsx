import React from 'react';
import { callFetch } from './Fetch'
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HistoryIcon from '@mui/icons-material/History';

export default function BookingRequests () {
  const id = useParams().id;
  const [title, setTitle] = React.useState('');
  const [oldBookings, setOldBookings] = React.useState([]);
  const [requestedBookings, setRequestedBookings] = React.useState([]);
  const [showHistory, setShowHistory] = React.useState(false);
  const [onlineDate, setOnlineDate] = React.useState('');
  // const [city, setCity] = React.useState('');
  // const [state, setState] = React.useState('');
  // const [postcode, setPostcode] = React.useState('');
  // const [country, setCountry] = React.useState('');
  // const [price, setPrice] = React.useState('');
  // const [images, setImages] = React.useState('');
  // const [thumbnail, setThumbnail] = React.useState('');
  // const [propertyType, setPropertyType] = React.useState('');
  // const [numOfBathrooms, setNumOfBathrooms] = React.useState('');
  // const [numOfBedrooms, setNumOfBedrooms] = React.useState('');
  // const [numOfBeds, setNumOfBeds] = React.useState('');
  // const [amenities, setAmenities] = React.useState('');
  // const [errorMsg, setErrorMsg] = React.useState('');
  // const navigate = useNavigate();

  React.useEffect(async () => {
    const listingData = await callFetch('GET', `/listings/${id}`, undefined, false, true);
    setOnlineDate(listingData.listing.metadata.liveDate);
    const bookingsData = await callFetch('GET', '/bookings', undefined, false, true);
    const listingBookings = bookingsData.bookings.filter(b => parseInt(b.listingId) === parseInt(id));
    const tempRequestedBookings = [];
    const tempOldBooking = listingBookings.filter(b => {
      if (b.status === 'pending') {
        tempRequestedBookings.push(b);
        return false;
      }
      return true;
    })

    setOldBookings(tempOldBooking);
    setRequestedBookings(tempRequestedBookings);

    const data = await callFetch('GET', `/listings/${id}`, undefined, false, false);
    setTitle(data.listing.title);
    // setStreet(data.listing.address.street);
    // setCity(data.listing.address.city);
    // setState(data.listing.address.state);
    // setPostcode(data.listing.address.postcode);
    // setCountry(data.listing.address.country);
    // setPrice(data.listing.price);
    // setThumbnail(data.listing.thumbnail);
    // setImages(data.listing.metadata.images);
    // setPropertyType(data.listing.metadata.propertyType);
    // setNumOfBathrooms(data.listing.metadata.numOfBathrooms);
    // setNumOfBedrooms(data.listing.metadata.numOfBedrooms);
    // setNumOfBeds(data.listing.metadata.numOfBeds);
    // setAmenities(data.listing.metadata.amenities);
  }, [])

  const acceptBooking = async (b) => {
    try {
      await callFetch('PUT', `/bookings/accept/${b.id}`, undefined, false, true);
      const tempRequestedBookings = requestedBookings.filter(bo => b !== bo);
      const tempOldBookings = oldBookings;
      b.status = 'accepted';
      tempOldBookings.push(b);
      setRequestedBookings(tempRequestedBookings);
      setOldBookings(tempOldBookings);
    } catch (error) {
      alert(error);
    }
  }

  const declineBooking = async (b) => {
    try {
      await callFetch('PUT', `/bookings/decline/${b.id}`, undefined, false, true);
      const tempRequestedBookings = requestedBookings.filter(bo => b !== bo);
      const tempOldBookings = oldBookings;
      b.status = 'declined';
      tempOldBookings.push(b);
      setRequestedBookings(tempRequestedBookings);
      setOldBookings(tempOldBookings);
    } catch (error) {
      alert(error);
    }
  }

  return (<>
    <br />
    <h1 className="publish-text">Booking requests for {title}</h1>
    <br />
    <div>
      Online for: {onlineDate !== undefined ? Math.round((new Date(new Date().getFullYear(), 11, 31) - onlineDate) / (1000 * 60 * 60 * 24)) : 'N/A'} days
    </div>
    <div>
      Earnings this year: ${
        (oldBookings.filter(b => b.status === 'accepted' && new Date(b.dateRange.start).getFullYear() === new Date().getFullYear())
          .reduce((a, b) => a + parseInt(b.totalPrice), 0)).toFixed(2)
      }
    </div>
    <div>
      Days booked this year: {
        (oldBookings.filter(b => b.status === 'accepted' && new Date(b.dateRange.start).getFullYear() === new Date().getFullYear())
          .map(b => {
            const thisYear = new Date().getFullYear();
            const startDate = new Date(b.dateRange.start);
            const endDate = new Date(b.dateRange.end);
            if (startDate.getFullYear() === thisYear && endDate.getFullYear() === thisYear) {
              return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
            } else if (startDate.getFullYear() === thisYear) {
              return Math.round((new Date(new Date().getFullYear(), 11, 31) - startDate) / (1000 * 60 * 60 * 24));
            } else if (endDate.getFullYear() === thisYear) {
              return Math.round((endDate - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            }
            return 0;
          })
          .reduce((a, b) => a + b, 0))
      }
    </div>
    <br />
    <Button variant='outlined' startIcon={<HistoryIcon />} onClick={() => setShowHistory(!showHistory)}>{showHistory ? <>Back</> : <>Booking Request History</>}</Button>
    <br />
    <br />
    { showHistory
      ? <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Price ($)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {oldBookings.map((b, idx) => {
            return (
              <tr key={idx}>
                <td>{b.owner}</td>
                <td>{new Date(b.dateRange.start).toLocaleDateString()}</td>
                <td>{new Date(b.dateRange.end).toLocaleDateString()}</td>
                <td>{b.totalPrice}</td>
                <td>{b.status}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      : <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Username</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Price ($)</th>
            <th>Accept Request?</th>
          </tr>
        </thead>
        <tbody>
          {requestedBookings.map((b, idx) => {
            return (
              <tr key={idx}>
                <td>{b.owner}</td>
                <td>{new Date(b.dateRange.start).toLocaleDateString()}</td>
                <td>{new Date(b.dateRange.end).toLocaleDateString()}</td>
                <td>{b.totalPrice}</td>
                <td>
                  <Button color="success" variant='outlined' startIcon={<CheckIcon />} onClick={() => acceptBooking(b)}>
                    Accept
                  </Button>
                  <span> </span>
                  <Button color="error" variant='outlined' startIcon={<ClearIcon />} onClick={() => declineBooking(b)}>
                    Decline
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    }
  </>)
}
