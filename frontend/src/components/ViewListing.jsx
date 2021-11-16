import React from 'react';
import { callFetch } from './Fetch'
import { useNavigate, useParams } from 'react-router-dom';

function ViewListing () {
  const id = useParams().id;
  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');
  const [numOfBathrooms, setNumOfBathrooms] = React.useState('');
  const [numOfBedrooms, setNumOfBedrooms] = React.useState('');
  const [numOfBeds, setNumOfBeds] = React.useState('');
  const [images, setImages] = React.useState('');
  const [Reviews, setReviews] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(async () => {
    const data = await callFetch('GET', `/listings/${id}`, undefined, false, false);
    const listing = data.listing;
    setTitle(listing.title);

    setStreet(listing.address.street);
    setCity(listing.address.city);
    setState(listing.address.state);
    setPostcode(listing.address.postcode);
    setCountry(listing.address.country);

    setAmenities(listing.metadata.amenities);
    setPrice(listing.price);

    setImages(listing.metadata.images);
    setPropertyType(listing.metadata.propertyType);
    setReviews(listing.reviews);
    // Implement this
    // TO-DO: setReviewRating();
    setNumOfBedrooms(listing.metadata.numOfBedrooms);
    setNumOfBeds(listing.metadata.numOfBeds);
    setNumOfBathrooms(listing.metadata.numOfBathrooms);
  }, [])
  return (
    <></>
  )
}

export default ViewListing;
