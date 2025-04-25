require('dotenv').config();

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${process.env.TOKEN_PANDASCORE}`
    }
  }
  fetch('https://api.pandascore.co/csgo/teams?&filter[location]=BR&page=4&per_page=50', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));