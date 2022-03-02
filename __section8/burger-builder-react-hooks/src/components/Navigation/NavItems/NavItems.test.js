import React from 'react';

// import { describe, expect } from "@jest/globals";
import { configure, shallow } from 'enzyme';
import Adabter from 'enzyme-adapter-react-16';
import NavItems from "./NavItems";
import NavItem from "./NavItem/NavnItem";

configure({ adabter: new Adabter() })

describe('<NavItems />', () => {
  it('Should render two <NavItem /> elements if not authenticated', () => {
    const wrapper = shallow(<NavItems />);
    expect(wrapper.find(NavItem)).toHaveLength(2)
  });
})
