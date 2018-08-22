import React from 'react';
import { shallow } from 'enzyme';
import HotelList from  '../index.js';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("HotelList", () => {
  let mockHotels, wrapper;

  beforeEach(() => {
     mockHotels = [
      {id: 1, title:"MOCK_NAME_1", price:"A_PRICE"},
      {id: 2, title:"MOCK_NAME_2", price:"A_PRICE"},
    ];
     wrapper = shallow(<HotelList hotels = {mockHotels}/>);
  })

  it("should render a list of products as a unordered list", () => {
    expect(wrapper.find('li').length).toEqual(mockHotels.length);
  });

  it("should display the hotel name in each li element", () => {
    const firstElement = wrapper.find('li').first();
    expect(firstElement.contains(mockHotels[0].title)).toEqual(true);
  })

  it("should display the hotel price in each li element", () => {
    const firstElement = wrapper.find('li').first();
    expect(firstElement.contains(mockHotels[0].price)).toEqual(true);
  })

})
