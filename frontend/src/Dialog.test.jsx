import { shallow } from 'enzyme';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';


describe('Dialog', () => {
  const noop = () => {};
  it('sets open', () => {
    const openDialog = false;
    const dialog = shallow(<Dialog open={openDialog} onClose={noop}></Dialog>);
    expect(dialog.props().open).toBe(openDialog);
  });

  it('triggers onClose when closed', () => {
    const onclose = jest.fn();
    const dialog = shallow(<Dialog open={true} onClose={onclose}></Dialog>);
    dialog.simulate('close');
    expect(onclose).toBeCalledTimes(1);
  });
})
