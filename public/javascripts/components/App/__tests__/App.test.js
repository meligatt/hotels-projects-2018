import React from 'react';
import App from '../App';

//TODO Move this imports to setup file
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { sortDescendent, makeRequest } from '../../../helpers';

//TODO: Add to readme: https://github.com/facebook/jest/issues/5993
// Mocking the imported module:
jest.mock('../../../helpers', () => (
  { makeRequest: jest.fn(),
    sortDescendent: jest.fn(),
   })
 )

//TODO refactor this set up
configure({ adapter: new Adapter() });
axios.defaults.host = 'http://localhost:3000';
axios.defaults.adapter = httpAdapter;


describe("App", () => {
  describe("when state is initial", () => {
    it("renders no items in the list", () => {
      const mockData = [];
      const promise = Promise.resolve(mockData);
      makeRequest.mockImplementation(() => promise);
      sortDescendent.mockImplementation(() => mockData);

      const wrapper = shallow(<App />);

      return promise.then((data) => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe("when state is populated with data", () => {
    it("renders correctly with items", () => {
      expect.assertions(2);
      const mockData = [{
        "id": "ID",
        "title": "TITLE",
        "address": "ADDRESS",
        "image": "IMG_URL",
        "rating": 4,
        "ratingType": "RATNG_TYPE",
        "promotion": "PROMOTION",
        "name": "NAME",
        "price": 329,
        "savings": 30,
        "freeCancellation": true
      },
      {
        "id": "ID2",
        "title": "TITLE2",
        "address": "ADDRESS2",
        "image": "IMG_URL2",
        "rating": 4,
        "ratingType": "RATNG_TYPE",
        "promotion": "PROMOTION",
        "name": "NAME",
        "price": 329,
        "savings": 30,
        "freeCancellation": true
      }];

      const promise = Promise.resolve(mockData);

      makeRequest.mockImplementation(() => promise);
      sortDescendent.mockImplementation(() => mockData);

      const wrapper = shallow(<App />);

      return promise.then((data) => {
        expect(wrapper.state('hotels').length).toBe(2);
        expect(wrapper).toMatchSnapshot();
      });
    })
  })
})
