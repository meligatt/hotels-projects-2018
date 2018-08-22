import React from 'react';
import FilterBar from  '../index.js';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe("FilterBar", () => {
  it("should render correctly", () => {
    const optionSelectedMock = "desc";
    const onOptionChangeMock = jest.fn();

    const wrapper =  shallow(
      <FilterBar
        optionSelected = { optionSelectedMock }
        onOptionChange = { onOptionChangeMock }
      />)
    expect(wrapper).toMatchSnapshot();
  })

  it("calls onOptionChange when select changes", () => {
    const optionSelectedMock = "desc";
    const onOptionChangeMock = jest.fn();

    const wrapper =  shallow(
      <FilterBar
        optionSelected = { optionSelectedMock }
        onOptionChange = { onOptionChangeMock }
      />);

      wrapper.find('select').simulate('change', 'VALUE');
      expect(onOptionChangeMock).toHaveBeenCalledWith('VALUE');
  })
})
