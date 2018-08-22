import axios from 'axios';
import React, { Component } from 'react';
import FilterBar from '../FilterBar';
import HotelList from '../HotelList';
import { sortDescendent, sortAscendent, makeRequest } from '../../helpers';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      hotels: null,
    }
  }

  componentDidMount(){
     makeRequest({
       endpoint:'/api/results',
       method:"GET"
     }).then((data) => {
       this.setState({
       hotels: sortDescendent({array: data, orderBy: "price"}),
       optionSelected: "desc",
       dataReady: true,
     });
   }).catch((error) => { console.log(error)})
  }

   handleOptionChange(sortValue){
    const { hotels } =  this.state;

    if (sortValue === "asc") {
      return this.setState({
        hotels: sortAscendent({array: hotels, orderBy: "price"}),
        optionSelected: sortValue,
      });
    }

    this.setState({
      hotels: sortDescendent({array: hotels, orderBy: "price"}),
      optionSelected: sortValue,
    });
  }

  render(){
    const {hotels, optionSelected } = this.state;
    if(hotels === null || hotels.length === 0) {
      return(<div>no hotels found</div>)
    }
    return(
      <div>
      <header>
        <h1>Qantas Hotels</h1>
      </header>
      <main>
      <FilterBar
        optionSelected={ optionSelected }
        onOptionChange = { (event) => { this.handleOptionChange(event.target.value) } }
      />
      <HotelList hotels={ hotels }/>
      </main>
      </div>
    )
  }
}
export default App;
