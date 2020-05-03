function game(){
    const gamePage = document.querySelector("main");
    gamePage.classList.toggle("hidden");
}

function starshipSelection(starships){
    const container = document.querySelector("body>div");
    //fill starships
    starships.forEach(starship => {
        const html = `
            <div onclick="emitSprite('${starship.img}')">
                <img src="${starship.img}" alt="${starship.name}">
                <p>${starship.name}</p>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", html);
    });

    //show container   
    container.classList.toggle("hidden");
}

export{
    game,
    starshipSelection,
}