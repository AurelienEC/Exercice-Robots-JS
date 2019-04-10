export default class Map{
    constructor(mapId){
        this.map = document.getElementById(mapId);
        this.xAxis = 10;
        this.yAxis = 10;
        this.nbRocks = 10;
        this.rocks = [];
        this.characters = [];
        window.addEventListener('readyToMove', this.prepareMove.bind(this));
    }

    createMap(){
        let x = 0
        let y = 0
        while (y < this.yAxis){
            let currentLineDiv = document.createElement('div')
            currentLineDiv.id = `line-${y}`;
            currentLineDiv.classList.add('line')
            while(x < this.xAxis){
                let currentColDiv = document.createElement('div');
                currentColDiv.id = `id-${y}-${x}`;
                currentColDiv.classList.add('case');
                currentLineDiv.appendChild(currentColDiv);
                x++
            }
            x = 0;
            this.map.appendChild(currentLineDiv);
            y++
        }
        document.getElementById('id-3-2').classList.add('rock');
    }
    addCharactersToMap(characters){
        characters.forEach((char) => {
            let elt = document.getElementById(`id-${char.position.y}-${char.position.x}`);
            elt.classList.add('character');
            elt.classList.add(char.name);
        });
        this.characters = [... characters];
        console.log(this.characters);
    }

    prepareMove(e){
        let robot = e.detail;
        // for xAxis
        for(let i = -3; i < 4; i++){
            let elt = document.getElementById(`id-${robot.position.y}-${robot.position.x + i}`);
            if(elt !== null && !elt.classList.contains(robot.name)){
                elt.classList.add('move');
                elt.classList.add(robot.name);
            }
        }
        // for yAxis
        for(let i = 0; i < 4; i++){
            let elt = document.getElementById(`id-${robot.position.y + i }-${robot.position.x}`);
            if(elt !== null && !elt.classList.contains(robot.name) && !elt.classList.contains('rock')){
                elt.classList.add('move');
                elt.classList.add(robot.name);
            }else if(elt.classList.contains('rock')){
                break;
            }
        }
        for(let i = 0; i > -4; i--){
            let elt = document.getElementById(`id-${robot.position.y + i }-${robot.position.x}`);
            if(elt !== null && !elt.classList.contains(robot.name) && !elt.classList.contains('rock')){
                elt.classList.add('move');
                elt.classList.add(robot.name);
            }else if(elt.classList.contains('rock')){
                break;
            }
        }
        this.listeners();
    }
    listeners(){
       let movesCases = Array.from(document.getElementsByClassName('move'));
       console.log(movesCases);
       movesCases.forEach((elt) => {
           elt.addEventListener('click', (e) => {
               console.log(e);
               alert("tu as cliqué ici");
               let selected = e.path[0];
               selected.classList.remove('move');
               selected.classList.remove('case');
               let name = selected.classList.value
               selected.classList.add('case');
               console.log(name);
               let char = this.characters.find( char => char.name === name )
               console.log('personnage', char);
           })
        })
    }
}
