export default class Robot{
    constructor(name){
        this.name = name;
        this.life = 100;
        this.speed = 3;
        this.position = {x: 5, y:5}
    }

    introduce(){
        console.log(`Bonjour je m'appelle ${this.name} j'ai ${this.life} points de vie, je me déplace à une vitesse de ${this.speed} cases par tour. Je suis à la case de coordonnées x:${this.position.x} y:${this.position.y}`);
    }

    readyToMove(){
         let event = new CustomEvent('readyToMove', {'detail' : this});
         window.dispatchEvent(event);
    }

    move(element){
        let place = element.id.split("-") //id-3-2
        this.position.y = Number(place[1]);
        this.position.x = Number(place[2]);

        //TODO: Check if exist weapon on the map element

        //TODO: Check if the robot is next to another Robot with is new position

    }
}
