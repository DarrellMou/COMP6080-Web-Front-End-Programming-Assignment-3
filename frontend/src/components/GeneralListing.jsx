import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GeneralListing ({ listing }) {
  const listingId = listing.id;
  const title = listing.title;
  const price = listing.price;
  const thumbnail = listing.thumbnail;
  const propertyType = listing.metadata.propertyType;
  const numOfBathrooms = listing.metadata.numOfBathrooms;
  const numOfBedrooms = listing.metadata.numOfBedrooms;
  const amenities = listing.metadata.amenities;
  const address = listing.address;
  const bookings = listing.bookings;
  const navigate = useNavigate();

  let addressStr = '';
  (address.street !== undefined) && (addressStr += address.street + ' ');
  (address.city !== undefined) && (addressStr += address.city + ' ');
  (address.state !== undefined) && (addressStr += address.state + ' ');
  (address.postcode !== undefined) && (addressStr += address.postcode + ' ');
  (address.country !== undefined) && (addressStr += address.country + ' ');

  return (
    <>
      <Card style={{ width: '18rem' }} onClick={() => navigate(`/listing/viewlisting/${listingId}`)}>
        <CardActionArea>
          <Card.Img variant="top" src={thumbnail} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Address: {(addressStr !== '') ? <> {addressStr} </> : 'N/A'}</ListGroupItem>
            <ListGroupItem>${price} per night</ListGroupItem>
            <ListGroupItem>Property Type: {(propertyType !== undefined) ? <> {propertyType} </> : 'N/A'}</ListGroupItem>
            <ListGroupItem>Number of Bathrooms: {(numOfBathrooms !== undefined) ? <> {numOfBathrooms} </> : 'N/A'}</ListGroupItem>
            <ListGroupItem>Number of Bedrooms: {(numOfBedrooms !== undefined) ? <> {numOfBedrooms} </> : 'N/A'}</ListGroupItem>
            <ListGroupItem>Amenities: {(amenities !== undefined) ? <> {amenities} </> : 'N/A'}</ListGroupItem>
              {(bookings.length !== 0) &&
                <>
                <ListGroupItem>Booking Status:
                <ul>
                  {bookings.map((a, idx) => {
                    return (
                      <li key={idx}>Booking from {new Date(a.dateRange.start).toLocaleDateString()} to {new Date(a.dateRange.end).toLocaleDateString()}: {a.status}</li>
                    )
                  })}
                </ul></ListGroupItem>
                </>
                }
          </ListGroup>
        </CardActionArea>
      </Card>
    </>
  )
}

GeneralListing.propTypes = {
  listing: PropTypes.object,
}

export default GeneralListing;
