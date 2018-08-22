import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { sortAscendent, sortDescendent, makeRequest } from '../index';

axios.defaults.host = 'http://localhost:3000';
axios.defaults.adapter = httpAdapter;

// TODO
describe('sortAscendent', () => {
  it('returns an array sorted ascendently when valid object is passed', () => {
    const arrayMock = [{id:2, name: "NAME_2"}, {id:1, name: "NAME_1"}];
    const orderByMock = "id";

    const result = sortAscendent({array: arrayMock, orderBy: orderByMock});

    expect(result).toEqual([{id:1, name: "NAME_1"}, {id:2, name: "NAME_2"}]);
  });
});

describe('sortDescendent', () => {
  it('returns an array sorted Descendently when valid object is passed', () => {
    //set up
    const arrayMock = [{id:545, name: "NAME_1"}, {id:423, name: "NAME_2"}];
    const orderByMock = "name";

    const result = sortDescendent({array: arrayMock, orderBy: orderByMock});

    expect(result).toEqual([{id:423, name: "NAME_2"}, {id:545, name: "NAME_1"}]);
  });
})

describe('makeRequest', () => {
  it('sends a HTTP request with method set as GET', () => {
      expect.assertions(1);
      const endpoint = "/fake/endpoint";
      const scope = nock('http://localhost:3000')
        .get(endpoint)
        .reply(200, '{"lorem":"ipsum"}')

      return makeRequest({
      endpoint: '/fake/endpoint',
      method: 'GET',
    }).then(() => {
      expect(scope.isDone()).toBe(true);
    })
  })
})
