import {Routie} from "../lib/Routie.js";
import * as render from "./Render.js";

routie({
    //startPage
    "":() => {
        routie('background-details');
    },
    //Show details of the daily images
    "background-details":() => {
        render.nasaInfo();
    },
    //Show game
    "game":() => {
        render.game();
    },
});