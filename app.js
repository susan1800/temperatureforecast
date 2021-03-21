const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const btnClicked = document.querySelector('.btn');
const maxf = document.querySelector('#maxf');
const minf = document.querySelector('#minf');

const updateUI = data => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    const { cityDets, weather } = data;  

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the day and night images/icons
    const iconSrc = `img/${weather.WeatherIcon}.png`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    getForeCast(cityDets.Key)
      .then(data => {
          maxf.innerHTML = data.DailyForecasts[0].Temperature.Maximum.Value;
          minf.innerHTML = data.DailyForecasts[0].Temperature.Minimum.Value;
          details.innerHTML += `
            <div class="display-6 my-4">
                <span>Maximum: </span>
                <span id="maxf">${((parseFloat(maxf.innerHTML)-32)*5/9).toFixed(1)}</span>
                <span>&deg;C</span>
            </div>
            <div class="display-6 my-4">
                <span>Minimum: </span>
                <span id="minf">${((parseFloat(minf.innerHTML)-32)*5/9).toFixed(1)}</span>
                <span>&deg;C</span>
            </div>
          `;
      });

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    

    
    // console.log(maxf.innerHTML);
    // let maxc = Number(maxf.innerHTML);
    // console.log(maxc);
}

const updateUI2 = data => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    const { cityDets, weather } = data;  

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.LocalizedName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the day and night images/icons
    const iconSrc = `img/${weather.WeatherIcon}.png`;
    icon.setAttribute('src', iconSrc);

    // time.setAttribute('src', timesrc);
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    maxf.innerHTML = data.foreCast.DailyForecasts[0].Temperature.Maximum.Value;
    minf.innerHTML = data.foreCast.DailyForecasts[0].Temperature.Minimum.Value;
          details.innerHTML += `
            <div class="display-6 my-4">
                <span>Maximum: </span>
                <span id="maxf">${((parseFloat(maxf.innerHTML)-32)*5/9).toFixed(1)}</span>
                <span>&deg;C</span>
            </div>
            <div class="display-6 my-4">
                <span>Minimum: </span>
                <span id="minf">${((parseFloat(minf.innerHTML)-32)*5/9).toFixed(1)}</span>
                <span>&deg;C</span>
            </div>
          `;

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return{
        //cityDets: cityDets
        //weather: weather
        cityDets,
        weather
    };
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);
    localStorage.removeItem('lat');
    localStorage.removeItem('log');
});

btnClicked.addEventListener('click', () => {
    getLocation();
});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}

if(localStorage.getItem('lat')){
    async function weatherPage(){
        const cityDets = await getLoc(localStorage.getItem('lat'), localStorage.getItem('log'));
        const weather = await getWeather(cityDets.Key);
        const foreCast = await getForeCast(cityDets.Key);
        updateUI2({cityDets, weather, foreCast});
    }

    weatherPage();
    
}

