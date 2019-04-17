import Robot from "./Robot"
import Map from "./Map"

export default class Game {
    constructor(){
        this.turnNumber = 1;
        this.player1 = new Robot('R2D2');
        this.player2 = new Robot('c3po');
        this.player2.position.x = 2;
        this.player2.position.y = 5;
        this.map =  new Map('map');
        window.addEventListener('endMove', this.endTurn.bind(this));
    }

    generateMap(){
       this.map.createMap();
       this.map.addCharactersToMap([this.player1, this.player2]);
    }
    play(){
            if (this.turnNumber % 2 === 1){
                this.player1.readyToMove();
            }else{
                this.player2.readyToMove();
            }
    }
    endTurn(){
        this.turnNumber++;
        this.play();
    }
}
