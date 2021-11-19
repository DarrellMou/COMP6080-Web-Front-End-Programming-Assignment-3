import { shallow } from 'enzyme';
import * as React from 'react';
import { LoginForm, LoginButton } from './components/Login';

describe('LoginButton', () => {
  const noop = () => {};

  it('triggers onClick event when clicked', () => {
    const onclick = jest.fn();
    const button = shallow(<LoginButton onClick={onclick} />);
    button.simulate('click');
    expect(onclick).toBeCalledTimes(1);
  });

  it('uses button text', () => {
    const buttonText = 'hello';
    const button = shallow(<LoginButton onClick={noop} text={buttonText} />);
    expect(button.text()).toBe(buttonText);
  });
})

describe('LoginForm', () => {
  const noop = () => {};

  it('triggers onBlur when blurred', () => {
    const onblur = jest.fn();
    const loginForm = shallow(<LoginForm onBlur={onblur}/>);
    loginForm.simulate('blur');
    expect(onblur).toBeCalledTimes(1);
  });

  it('sets type', () => {
    const type = 'text';
    const loginForm = shallow(<LoginForm formType={type} onBlur={noop}/>);
    expect(loginForm.props().type).toBe(type);
  });

  it('sets class name', () => {
    const classname = 'classname';
    const loginForm = shallow(<LoginForm className={classname} onBlur={noop}/>);
    expect(loginForm.hasClass(classname)).toBe(true);
  });

  it('sets form name', () => {
    const formname = 'formname';
    const loginForm = shallow(<LoginForm formName={formname} onBlur={noop}/>);
    expect(loginForm.props().name).toBe(formname);
  });
})
