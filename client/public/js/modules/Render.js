function hideAllScreens(){
    const selector = "body>main";
    const screenElements = document.querySelector(selector);
    
    for (let i = 0; i < screenElements.length; i++) {
        const screenElement = screenElements[i];
        screenElement.classList.add("hidden");
    }    
}

function nasaInfo(){
    hideAllScreens();

    const nasaInfoPage = document.getElementById("nasaInfoPage");
    nasaInfoPage.classList.toggle("hidden");
}

function game(){
    hideAllScreens();

    const gamePage = document.getElementById("gamePage");
    gamePage.classList.toggle("hidden");
}

export{
    nasaInfo,
    game,
}