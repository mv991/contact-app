import axios from 'axios';

export const getStates = async(country,token) => {
 const res = await axios.post(`https://countriesnow.space/api/v0.1/countries/states`, {country:country})
.then(response => response.data.data.states)
.then(result => result)
.catch(error => console.log('error', error));

return res;
} 

export const getCities = async(state,country) => {
try {
 const res = await axios.post(`https://countriesnow.space/api/v0.1/countries/state/cities`, {country:country,state:state})
.then(response => response.data.data)
.then(result => result)
.catch(error => console.log('error', error));
return res;
}catch(e) {
   console.log(e)
}
} 