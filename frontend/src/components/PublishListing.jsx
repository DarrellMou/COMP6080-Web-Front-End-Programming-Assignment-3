import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { callFetch } from './Fetch';
// import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
// import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

function PublishListing () {
  const id = useParams().id;
  const [availability, setAvailability] = React.useState([{}]);
  const [errorMsg, setErrorMsg] = React.useState('');
  const navigate = useNavigate();

  const publish = async () => {
    try {
      const listingData = await callFetch('GET', `/listings/${id}`, undefined, false, true);
      listingData.listing.metadata.liveDate = new Date();
      await callFetch('PUT', `/listings/${id}`, listingData, true, true);
      const body = {
        availability: availability
      };
      await callFetch('PUT', `/listings/publish/${id}`, body, true, true);
      navigate('/listing/yourlistings');
    } catch (err) {
      setErrorMsg(err);
    }
  }

  const addAvailability = (date, idx, from) => {
    const newAvailability = [...availability];
    newAvailability[idx][from] = date;
    setAvailability(newAvailability);
  }
  return (
    <>
      <br />
      <h1 className="publish-text">Publish Listing</h1>
      <br />
      <Grid container spacing={2}>
        {/* If email is not empty, only provide listings that belongs to the email */}
        {availability.map((a, idx) => {
          return (
            <Grid item xs={2} key={idx}>
              <Stack component="form" noValidate spacing={3}>
                <TextField
                  id="start-date"
                  label="Start"
                  type="date"
                  onBlur={e => (addAvailability(e.target.value, idx, 'start'))}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="end-date"
                  label="End"
                  type="date"
                  onBlur={e => (addAvailability(e.target.value, idx, 'end'))}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Grid>
          )
        })}
      </Grid>
      <br />
      {(errorMsg === '') ? <></> : (<div className="error-message">{errorMsg}</div>)}
      <Button variant='outlined' startIcon={<AddIcon />} onClick={() => setAvailability([...availability, {}])}>
        Add More Bookings
      </Button>
      <Button variant='outlined' startIcon={<AddIcon />} onClick={ publish }>
        Publish
      </Button>
      <Button variant='outlined' startIcon={<CancelIcon />} onClick={() => { navigate('/listing/yourlistings') }}>
        Cancel
      </Button>
    </>
  );
}

PublishListing.propTypes = {
}

export default PublishListing;
