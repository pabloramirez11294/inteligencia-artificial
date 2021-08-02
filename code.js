function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

function test(states){
    var location = states[0];		
    var state = states[0] == "A" ? states[1] : states[2];
    // se cuenta la veces que paso por un estado
    contarEstado(location, states[1], states[2]);
    mostrarContadores();
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML+="<br>Location ".concat(location).concat(` | A->${states[1]} - B->${states[2]} - Action: `).concat(action_result);
    if (action_result == "CLEAN"){
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";	
    
    // si está limpio A y B se ensucia un lugar al azar
    if(states[1] == 'CLEAN' && states[2] == 'CLEAN') ensuciarStates(states);
    console.log("Contador:" + arrayContador)
    // se verifica que el se pasara por cada estado 2 veces
    const mayor2 = (currentValue) => currentValue >= 2;
    if(arrayContador.every(mayor2)) {
        document.getElementById(`titleFinalizado`).innerHTML = 'Finalizado';
        return;
    }
    
    setTimeout(function(){ test(states); }, 500);
}

// es la referencia de las veces que ha pasado por un estado
const arrayContador = [0, 0, 0, 0, 0, 0, 0, 0];
var states = ["A","DIRTY","DIRTY"];
test(states);


function contarEstado(location, left, right) {
    console.log(location, left, right);
    if (location == 'A' && left == 'DIRTY' && right == 'DIRTY') arrayContador[0] = arrayContador[0] + 1;
    else if (location == 'B' && left == 'DIRTY' && right == 'DIRTY') arrayContador[1] = arrayContador[1] + 1;
    else if (location == 'A' && left == 'DIRTY' && right == 'CLEAN') arrayContador[2] = arrayContador[2] + 1;
    else if (location == 'B' && left == 'DIRTY' && right == 'CLEAN') arrayContador[3] = arrayContador[3] + 1;

    else if (location == 'A' && left == 'CLEAN' && right == 'DIRTY') arrayContador[4] = arrayContador[4] + 1;
    else if (location == 'B' && left == 'CLEAN' && right == 'DIRTY') arrayContador[5] = arrayContador[5] + 1;
    else if (location == 'A' && left == 'CLEAN' && right == 'CLEAN') arrayContador[6] = arrayContador[6] + 1;
    else if (location == 'B' && left == 'CLEAN' && right == 'CLEAN') arrayContador[7] = arrayContador[7] + 1;
}


function ensuciarStates(states) {
    const estados = ['DIRTY', 'CLEAN']; 
    states[1] = estados[Math.floor(Math.random() * 2)];
    states[2] = estados[Math.floor(Math.random() * 2)];
}

function mostrarContadores() {
    for (const iterator in arrayContador) {
        document.getElementById(`cont${iterator}`).innerHTML = arrayContador[iterator];
    }
}