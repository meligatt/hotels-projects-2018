import React from 'react';
import PropTypes from 'prop-types';

const HotelList = ({ hotels }) => {
  return(
    <ul>
    {
      hotels.map((hotel) => {
        return (<li key={hotel.id}>
          <div>Hotel: {hotel.title} - price: {hotel.price}</div>
        </li>)
      })
    }
    </ul>
  )
}

HotelList.propTypes = {
  hotels: PropTypes.array.isRequired
}

export default HotelList;
