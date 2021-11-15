import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function Listing ({ title, address, price, thumbnail, metadata }) {
  console.log('title: ' + title);
  console.log('address: ' + JSON.stringify(address));
  console.log('price: ' + price);
  console.log('thumbnail: ' + thumbnail);
  console.log('metadata: ' + metadata);
  let addressStr = '';
  (address.street !== undefined) && (addressStr += address.street + ' ');
  (address.city !== undefined) && (addressStr += address.city + ' ');
  (address.state !== undefined) && (addressStr += address.state + ' ');
  (address.postcode !== undefined) && (addressStr += address.postcode + ' ');
  (address.country !== undefined) && (addressStr += address.country + ' ');
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={thumbnail} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {(addressStr !== '') ? <ListGroupItem>{addressStr}</ListGroupItem> : <></>}
          <ListGroupItem>${price} per night</ListGroupItem>
          {/* {propertyType ? <ListGroupItem>{propertyType}</ListGroupItem> : <></>}
          {numOfBathrooms ? <ListGroupItem>{numOfBathrooms}</ListGroupItem> : <></>}
          {numOfBeds ? <ListGroupItem>{numOfBeds}</ListGroupItem> : <></>} */}
        </ListGroup>
      </Card>
    </>
  )
}

Listing.propTypes = {
  title: PropTypes.string,
  address: PropTypes.object,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  propertyType: PropTypes.string,
  numOfBathrooms: PropTypes.number,
  numOfBeds: PropTypes.number,
  metadata: PropTypes.object,
}

export default Listing;
