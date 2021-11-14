import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function Listing ({ title, address, price, thumbnail, metadata }) {
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={thumbnail} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {address ? <ListGroupItem>{JSON.stringify(address)}</ListGroupItem> : <></>}
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
