import { shallow } from 'enzyme';
import * as React from 'react';
import GeneralListing from './components/GeneralListing';

describe('GeneralListing', () => {
  let listing = {
    id: 1,
    title: 'Oceanside Villa',
    owner: 'alina@unsw.edu.au',
    address: {},
    price: 350,
    thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    metadata: {},
    reviews: [
      {}
    ],
    availability: [
      {}
    ],
    published: true,
    postedOn: '2020-10-31T14:45:21.077Z'
  }


  // it('triggers onClick event when clicked', () => {
  //   const generalListing = shallow(<GeneralListing listing={listing} />);
  //   expect(generalListing.text()).toBe('Oceanside Villa');
  // });

  it('uses button text', () => {
    const generalListing = shallow(<GeneralListing listing={listing} />);
    expect(generalListing).toBe('Oceanside Villa');
  });
})

