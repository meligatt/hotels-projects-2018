import React from 'react';
import PropTypes from 'prop-types';

const FilterBar = ({
  optionSelected,
  onOptionChange
}) => {
  return(
    <div>
    Sort by
    <select value={ optionSelected } onChange = { (e) => {onOptionChange(e)} } >
    <option value="desc"> Price (high-low)</option>
    <option value="asc"> Price (low-high)</option>
    </select>
    </div>
  )
}

FilterBar.propTypes = {
  optionSelected: PropTypes.string.isRequired,
  onOptionChange: PropTypes.func.isRequired,
}

export default FilterBar;
