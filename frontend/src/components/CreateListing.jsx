import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import { callFetch } from './Fetch';
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { callFetch } from './Fetch'

const getBase64 = (file) => { // code obtained from https://www.codegrepper.com/code-examples/javascript/convert+input+image+to+base64+javascript
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function CreateListing () {
  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [postcode, setPostcode] = React.useState(0);
  const [country, setCountry] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');
  const [numOfBaths, setNumOfBaths] = React.useState(0);
  const [numOfBedrooms, setNumOfBedrooms] = React.useState(0);
  const [amenities, setAmenities] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const navigate = useNavigate();
  const submitListing = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title: title,
        address: {
          street: street,
          city: city,
          state: state,
          postcode: postcode,
          country: country
        },
        price: price,
        thumbnail: await getBase64(thumbnail),
        metadata: {
          propertyType: propertyType,
          numOfBaths: numOfBaths,
          numOfBedrooms: numOfBedrooms,
          amenities: amenities
        }
      }
      await callFetch('POST', '/listings/new', body, true, true);
      navigate('/listing/yourlistings');
    } catch (err) {
      setErrorMsg(err);
    }
  }
  return (
    <>
      { (localStorage.getItem('curToken') !== null)
        ? (
          <Form>
            <Form.Group className="mb-3" controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control onBlur={e => setTitle(e.target.value)} type="text" placeholder="Enter title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control onBlur={e => setStreet(e.target.value)} type="text" placeholder="1234 Main St" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control onBlur={e => setCity(e.target.value)} type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control onBlur={e => setState(e.target.value)} type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control onBlur={e => setPostcode(e.target.value)} type="number" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control onBlur={e => setCountry(e.target.value)} type="text" />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control onBlur={e => setPrice(e.target.value)} type="text" placeholder="Enter price" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control onChange={e => setThumbnail(e.target.files[0])} type="file" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPropertyType">
                <Form.Label>Property Type</Form.Label>
                <Form.Control onBlur={e => setPropertyType(e.target.value)} type="text" placeholder="Enter property type" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNumOfBaths">
                <Form.Label>Number of bathrooms</Form.Label>
                <Form.Control onBlur={e => setNumOfBaths(e.target.value)} type="text" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNumOfBedrooms">
                <Form.Label>Number of bedrooms</Form.Label>
                <Form.Control onBlur={e => setNumOfBedrooms(e.target.value)} type="text" />
              </Form.Group>
            </Row>
            <FloatingLabel controlId="floatingTextarea" label="Amenities">
              <Form.Control
                as="textarea"
                placeholder="Amenities"
                style={{ height: '100px' }}
                onBlur={e => setAmenities(e.target.value)}
              />
          </FloatingLabel>
          {(errorMsg === '') ? <></> : (<div className="error-message">{errorMsg}</div>)}
          <Button variant='outlined' startIcon={<CreateIcon />} onClick={submitListing}>
            Create
          </Button>
          </Form>)
        : <Navigate to="/"/> }
    </>
  );
}

export default CreateListing;
