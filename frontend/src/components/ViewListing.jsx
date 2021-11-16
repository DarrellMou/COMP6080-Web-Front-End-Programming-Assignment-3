import React from 'react';
import { callFetch } from './Fetch'
import { useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
  // const [errorMsg, setErrorMsg] = React.useState('');
  // const navigate = useNavigate();

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
  console.log(images);
  const imageList = !(images === '' || images === undefined) && images.map((image, idx) => {
    return {
      original: image,
      thumbnail: image
    }
  })
  console.log(imageList);
  return (
    <>
      <div>
        <h1 className='title-text'>{title}</h1>
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
        {(images === '' || images === undefined)
          ? <></>
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
      </div>
    </>
  )
}

export default ViewListing;
