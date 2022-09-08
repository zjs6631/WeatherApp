//API key for weather app
const weatherKey = "6054226a008faa1b35f3fa02e4ec577a";

//button for initiating search
const searchButton = document.getElementById('searchButton');

getData(weatherKey, "Wilmington").then(res=>{
    updateDOM(res);
});

searchButton.addEventListener('click', ()=>{
    //city being searched for using API
    let citySearch = document.getElementById('citySearch');
    let city = citySearch.value;
    
    /*
        had some confusion with accessing an objects properties when using async functions.
        had create a function to process the objects data, but could not get it to work in the moment
        resorted to only having one async function that does everything

        do have a factory function to create the localeConditions object

        also a function to update the DOM
    */

    //Call the async function and .then update the DOM using the DOM function
    getData(weatherKey, city).then(res =>{
        updateDOM(res);
    });

    
    

})

//The async function that handles the API call
async function getData(weatherKey, city) {

    //Try to fetch the api data using the key and city input
    try{
        let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherKey + "&units=imperial");
        
        //await the response of the json date
        const data = await response.json();
        
        //create variables to be assigned value based off of the data
        let place = data.name;
        let description = data.weather[0].description;
        let temp = data.main.temp;
        let feelsLike = data.main.feels_like;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;

        //create an object using those values
        let localeInfo = new localeCondition(place, description, temp, feelsLike, wind, humidity);
        //return the object
        return localeInfo;
        
    } catch(err){
        console.log(err);
    }
   
};

//update the DOM 
function updateDOM(res) {
    //grab all necessary fields
    let place = document.getElementById('place');
    let conditions = document.getElementById('conditions');
    let temp = document.getElementById('temp');
    let feelsLike = document.getElementById('feelsLike');
    let wind = document.getElementById('wind');
    let humidity = document.getElementById('humidity');

    ///reassign their values
    place.innerHTML = res.place;
    conditions.innerHTML = res.description;
    temp.innerHTML = res.temp;
    feelsLike.innerHTML = res.feelsLike;
    wind.innerHTML = res.wind;
    humidity.innerHTML = res.humidity;
    

};

//object factory to create an object to hold the condition values
let localeCondition = function(place, description, temp, feelsLike, wind, humidity) {
    this.place = place;
    this.description = description;
    this.temp = temp + "F";
    this.feelsLike = feelsLike + "F";
    this.wind = wind + "mph";
    this.humidity = humidity + "%";
}





