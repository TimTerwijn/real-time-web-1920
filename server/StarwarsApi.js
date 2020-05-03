const starships = [];

function init(){
    const fetch = require('node-fetch');

    //get space image of the day
    const url = "https://swapi.dev/api/starships";

    
    //get and save space image of the day
    fetch(url)
    .then(res => res.json())
    .then(json => {
        for (var i = 0; i < json.results.length; i++) { 
            const ship = json.results[i];
            
            const starship = {
                "name": ship.name,
                "img": `/img/players/${ship.name}.png`,
            }
    
            starships.push(starship);
        }
    });
}

function getStarships(){
    return starships;
}

module.exports = {
    getStarships,
}

init();