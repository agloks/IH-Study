/*
    1-criar uma função para virar o rover@
    2-criar uma função para mover o rover para frente ou para trás@
    3-criar uma função que recebe uma lista de comandos e executa

    #
    4-cria o objeto rover que terá como propriedade a direção, por padrão a direnção será N.@
    4.1-Coodernada/Direções:

    N-Norte || F-Forward
    S-Sul || B-Back
    E-Leste || R-Right
    W-Oeste || L-left

    4.2-Cria uma função que pegará a primeira letra da string e atribuira
    de acordo a direção.@
    #

    #Cria uma matriz 10x10 essa será o mapa e as coodernadas do rover@
    *As funções turnLeft e turnRight recebera um objeto como argumento@
    *A matriz representará a coodernada do mapa N,S,E,W
        Norte diminui valor da linha matriz
        Sul aumenta valor da linha matriz
        Leste aumenta valor da coluna matriz
        Oeste diminui valor da coluna matriz

*/

//Variables ==>

const LIMIT_FORWARD = [0,10,20,30,40,50,60,70,80,90]
const LIMIT_BACK = [9,19,29,39,49,59,69,79,89,99]
const CONSTELATIONS = ["North","East","South","West"]
const OBSTACLES = [20,31,22,53,69,37,10,8,95,81,73,63,5]

var count_constelation = 0;
var log_constelation= [];

var rover_one =
{
    direction:[],//STRING PARA MANUAL, ARRAY PARA RANDOM
    travelLog:[],
};

var rover_two =
{
    direction:[],//STRING PARA MANUAL, ARRAY PARA RANDOM
    travelLog:[],
};


//vetor coodernate representativo por numeral:
//i.e 11 = [1][1] == (1,1)
var mapa =
{
     coodernate:[],
     position:55,
     constelation:"North",
};

for(let x = 0; x < 10; x+=1){
    for(let y = 0; y < 10; y+=1){
        mapa["coodernate"].push([x,y]);
    }
}

//Functions ==>

var sentido = mapa.constelation;
var error = false;

function commands(rover){//rensposavel por selecionar a função apropriada para mover, recebe uma string ou array
    let moves = rover[0];//pega primeiro elemento da string ou array
    if(moves === "l") {turnLeft();}
    else if(moves === "r") {turnRight();}
    else if(moves === "f" || moves === "b") {goForward(moves,sentido);}
    else{error = true;}
}

function turnLeft() {
    if(count_constelation === 0 ) {
        count_constelation = 4;
    }
    count_constelation -= 1;
    mapa.constelation = CONSTELATIONS[count_constelation];
    sentido = mapa.constelation;
    log_constelation.push(sentido);
}

function turnRight(){
    if(count_constelation === 3 ) {
        count_constelation = -1;
    }
    count_constelation += 1;
    mapa.constelation = CONSTELATIONS[count_constelation];
    sentido = mapa.constelation;
    log_constelation.push(sentido);
}

function goForward(moves,sentido) {
    if(sentido.includes("E")) {
        log_constelation.push(sentido);
        let posição = mapa.position;
        if(posição >= 10) {
            (moves === "b") ? mapa.position -= 10 : mapa.position += 10;
            return mapa.position;
       }
    }
    else if(sentido.includes("W")) {
        log_constelation.push(sentido);
        let posição = mapa.position;
        if(posição <= 90) {
            (moves === "b") ? mapa.position += 10 : mapa.position -= 10;
            return mapa.position;
        }
    }
    else if(sentido.includes("N")) {
        return ((moves === "F" || moves === "f") && sentido.includes("N"))? moveForward(): moveBack();
    }
    else if(sentido.includes("S")){
        log_constelation.push(sentido);
        return((moves === "F" || moves === "f") && sentido.includes("N")) ? moveBack(): moveForward();
    }
}

function moveForward(){//Move para norte com F argumento
    let posição = mapa.position;
    log_constelation.push(sentido);
    if(LIMIT_FORWARD.includes(posição) === false) {
        mapa.position-= (posição-(posição-1));
        return mapa.position;
    }
}

function moveBack(){//Move para sul com B argumento
    let posição = mapa.position;
    log_constelation.push(sentido);
    if(LIMIT_BACK.includes(posição) === false) {
        mapa.position+= (posição-(posição-1));
        return mapa.position;
    }
}

function manualTravel(rover) {
    let quanty = rover["direction"].length;
    //responsavel por fazer o travelLog manual
    for(let k = 0; k <  quanty ; k++){
    commands(rover["direction"][k]);
    rover.travelLog.push(mapa.position);
    }
}

var count_local = 0;//global para prints
function prints(coodernada,rover,obstacle) {
    if(OBSTACLES.includes(coodernada)=== true || obstacle.includes(coodernada)) {
        console.log("Obstacle Found, Break");
        return false;
    }
    if (error !== true) {
        console.log("Rover Actual Commands: "+ rover.direction[count_local] +" ||| Rover here in: "+mapa.coodernate[coodernada] + " ||| Constelation to : "  + log_constelation[count_local]);
        count_local += 1;
    }
    else {
         console.log("Commands error, check input");
         return false;
    }
}

//reseta certas variaveis para pode atribuir o rover_two
function reset() {
    mapa.position = 33;
    log_constelation = [];
    count_local = 0;
    mapa.constelation = "North";
    sentido = "North";
    count_constelation = 0;
}

function run(travelLog,rover,obstacle_extra) {
    let stop = true;//conditions
    for(let a = 0; a < rover.travelLog.length; a += 1){
        if(stop !== false){
            stop = prints(travelLog[a],rover,obstacle_extra);
        }
    }
}

function manual(commands,rover,obstacle_extra) {//obstacle_extra tem que ser array, caso não quera da obstaculo extra coloque [].
    rover["direction"] = commands;
    manualTravel(rover);
    run(rover.travelLog,rover,obstacle_extra);
}

/*
----------------------------------------------- MANUAL TEST ---------------------------------

manual("frrrbbbrlrrl",rover_one,[]);
console.log("\n"+"let's start other rover"+"\n");
reset();
manual("bbbllrf",rover_two,rover_one.travelLog);

*/


//---------------------------------------- RANDOM TEST --------------------------
function randomTest(rover){
    let options = ["f","l","r","b"]
    let numbers = Math.floor(Math.random(4)*16)
    for(let x = 0;x < numbers; x += 1) {
        rover["direction"].push(options[Math.floor(Math.random()*4)]);
    }
    //responsavel por fazer o travelLog random
    for(let y = 0;y < numbers; y += 1) {
        commands(rover["direction"][y]);
        rover["travelLog"].push(mapa.position);
    }
}


//starting...
//rover 1 here
randomTest(rover_one);
run(rover_one.travelLog,rover_one,[]);

//rover 2 here
console.log("\n"+"let's starting the two-rover"+"\n")
reset();
randomTest(rover_two);
run(rover_two.travelLog,rover_two,rover_one.travelLog);
