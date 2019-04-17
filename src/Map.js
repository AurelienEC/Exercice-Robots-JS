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
        console.log("create");
        let x = 0
        let y = 0
        this.map.innerHTML = '';
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
        //document.getElementById('id-3-2').classList.add('rock');
    }
    addCharactersToMap(characters){
        characters.forEach((char) => {
            let elt = document.getElementById(`id-${char.position.y}-${char.position.x}`);
            elt.classList.add('character');
            elt.classList.add(char.name);
        });
        this.characters = [... characters];

    }
    refreshCharactersOnMap(){
        this.characters.forEach((char) => {
            let elt = document.getElementById(`id-${char.position.y}-${char.position.x}`);
            elt.classList.add('character');
            elt.classList.add(char.name);
        });

    }

    prepareMove(e){
        let robot = e.detail;
        console.log(robot);
        // for xAxis
        for(let i = -1; i > -robot.speed; i--){
            let elt = document.getElementById(`id-${robot.position.y}-${robot.position.x + i}`);
            if(elt !== null){
                if(!elt.classList.contains('character') && !elt.classList.contains('rock')){
                    elt.classList.add('move');
                    elt.classList.add(robot.name);
                }else if(elt.classList.contains('rock') || elt.classList.contains('character')){
                    break;
                }
            }

        }
        for(let i = 1; i <= robot.speed; i++){
            let elt = document.getElementById(`id-${robot.position.y}-${robot.position.x + i}`);
            if(elt !== null){
                if(!elt.classList.contains('character') && !elt.classList.contains('rock')){
                    elt.classList.add('move');
                    elt.classList.add(robot.name);
                }else if(elt.classList.contains('rock') || elt.classList.contains('character')){
                    break;
                }
            }
        }
        // for yAxis
        for(let i = 1; i <= robot.speed; i++){
            let elt = document.getElementById(`id-${robot.position.y + i }-${robot.position.x}`);
            if(elt !==null){
                if(!elt.classList.contains('character') && !elt.classList.contains('rock')){
                    elt.classList.add('move');
                    elt.classList.add(robot.name);
                }else if(elt.classList.contains('rock') || elt.classList.contains('character')){
                    break;
                }
            }

        }
        for(let i = -1; i > - robot.speed; i--){
            let elt = document.getElementById(`id-${robot.position.y + i }-${robot.position.x}`);
            if(elt !==null){
                if(!elt.classList.contains('character') && !elt.classList.contains('rock')){
                    elt.classList.add('move');
                    elt.classList.add(robot.name);
                }else if(elt.classList.contains('rock') || elt.classList.contains('character')) {
                    break;
                }
            }
        }
        this.listeners(robot);
    }
    listeners(robot){
       let movesCases = Array.from(document.getElementsByClassName('move'));
       movesCases.forEach((elt) => {
           elt.addEventListener('click', (e) => {
               robot.move(elt);
               this.refreshMap();
           })
        })
    }
    refreshMap(){
        this.createMap();
        this.refreshCharactersOnMap();
        let event = new CustomEvent('endMove', {'detail' : this});
        window.dispatchEvent(event);
    }
}
