import axios from 'axios';

// TODO: maybe add an array as argument instead of comparison function
// check if is working for strings
export const sortAscendent = ({array, orderBy}) => {
  const sortedAarray = array.sort((a,b) => {
    // previous implementation doesnt work for strings:
    // return a[orderBy] - b[orderBy];
    if(a[orderBy] < b[orderBy]) return -1;
    if(a[orderBy] > b[orderBy]) return 1;
    return 0;
  });
  return sortedAarray;
}

export const sortDescendent = ({array, orderBy}) => {
  const sortedAarray = array.sort((a,b) => {
    // previous implementation doesnt work for strings:
    // return b[orderBy] - a[orderBy];

    if(a[orderBy] > b[orderBy]) return -1;
    if(a[orderBy] < b[orderBy]) return 1;
    return 0;
  })
  return sortedAarray;
}

export function makeRequest({ endpoint, method, params }){
  // TODO: add this hardcoded value in a config file with URL's
  const APP_URL = "http://localhost:3000";

 return axios({
   url: APP_URL + endpoint,
   method: method,
   params,
   transformResponse: [(data) => data],
 })
 .then(({data}) => {
   return JSON.parse(data);
 })
 .catch((error) => {
   return error;
 });
}
