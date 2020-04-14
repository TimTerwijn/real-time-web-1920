let nasaObject;

function init(){
    const fetch = require('node-fetch');
    const apiKeyStorage = require("./ApiKey.js");
    let apiKey;

    //get api key

    //check if on heroku
    if(apiKeyStorage == null){
        //fix api key on heroku
        //https://stackoverflow.com/a/55233621
        
        console.log("Heroku api does not work, yet...");
        apiKey = "DEMO_KEY";
    }else{//user is on local storage
        apiKey = apiKeyStorage.get();
    }

    //get space image of the day
    const urlBase = "https://api.nasa.gov/planetary/apod";
    const urlKey = `?api_key=${apiKey}`;
    const urlFinal = urlBase + urlKey;

    
    //get and save space image of the day
    nasaObject = fetch(urlFinal)
        .then(res => res.json())
        .then(json => json);
}

function getTitle(){
    return nasaObject.title;
}

function getDescription(){
    return nasaObject.explanation;
}

function getDate(){
    return nasaObject.date;
}

function getImage(){
    return nasaObject.url;
}

module.exports = {
    getTitle,
    getDescription,
    getDate,
    getImage,
}

init();