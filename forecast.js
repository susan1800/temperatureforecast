const key = 'GK6HldXA4gIwW9RA5AnbaVYJK0TS0Gdr';

const getWeather = async (id) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

const getForeCast = async (id) => {
    const base = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
}

const getCity = async city => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

const getLoc = async (lat, lon) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    const query = `?apikey=${key}&q=${lat},${lon}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data;
};

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
}
  
async function showPosition(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude +
    // "<br>Longitude: " + position.coords.longitude;
    const cityDets = await getLoc(position.coords.latitude, position.coords.longitude);
    const weather = await getWeather(cityDets.Key);
    const foreCast = await getForeCast(cityDets.Key);
    updateUI2({cityDets, weather, foreCast});
    if(localStorage.getItem('city')){
        localStorage.removeItem('city');
    } 
    localStorage.setItem('lat', position.coords.latitude);
    localStorage.setItem('log', position.coords.longitude);
}



// getCity('patan').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));
