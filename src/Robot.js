export default class Robot{
    constructor(name){
        this.name = name;
        this.life = 100;
        this.speed = 3;
        this.position = {x: 0, y:0}
    }

    introduce(){
        console.log(`Bonjour je m'appelle ${this.name} j'ai ${this.life} points de vie, je me déplace à une vitesse de ${this.speed} cases par tour. Je suis à la case de coordonnées x:${this.position.x} y:${this.position.y}`);
    }

    readyToMove(){
         let event = new CustomEvent('readyToMove', {'detail' : this});
         window.dispatchEvent(event);
    }
    move(){
       //TODO
    }
}
