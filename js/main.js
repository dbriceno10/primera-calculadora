window.onload = () => {
    display = document.getElementById("display-calculator")
    // document.onkeydown = keyboard
}

let saveDisplay = "0" //Display inicial = 0
let float = false // Para tener decimales en pantalla
let init = true //Variable de inicicialización del número
let hiddenNumber = 0 //Guardamos el primer número que se escribe, oclto o en espera
let currentOp = "false" //operación en curso; "false" =  sin operación.



const captureBtn = (num) => {//Captura el número pulsado
    if (saveDisplay == "0" || init == true) {//inicializa
        display.innerHTML = num//muestra en pantalla
        saveDisplay = num //guardamos el número
        if (num == ".") { //si escribimos una coma al principio del número
            display.innerHTML = "0." //escribimos 0.
            saveDisplay = num //guardar número
            float = true //cambiar estado de float
            }
    } else {//continuar
        if (num == "." && float == false ) {//si escribimos una coma decimal por primera vez
            display.innerHTML+= num //capturamos y mostramos en el display
            saveDisplay+= num //actualizamos el número
            float = true
        } else if (num == "." && float == true) {// Bloqueamos el decimal si ya existía uno
            console.error("Ya está trabajando con decimales")
        } else {//Para el resto de los casos simplemente escribe números del 0 al 9
            display.innerHTML+= num //capturamos y mostramos en el display
            saveDisplay+= num //actualizamos el número
        }
    }
    init = false //número inicializado, podemos ampliarlo
}

const operation = (operator) => {
    equal()//si existen operaciones pendientes se van a realizar primero
    hiddenNumber = saveDisplay //Guardamos el primer número que se escribe o número en espera
    currentOp = operator //Guardamos el tipo de operación
    init = true //inicializar pantalla
}

const equal = () => {
    float = false
    let auxSolve //para guardar la operación
    let solve // para guardar la solución de la operación
    if (currentOp == "false") {//no hay ninguna operación pendiente
        console.log("sin operaciones pendientes, estado: " + currentOp)
        display.innerHTML = saveDisplay //nos limitamos a mostrar lo que hay en pantalla
    } else {
        if (currentOp == "/" && ((hiddenNumber == 0 && saveDisplay == 0) || saveDisplay == 0)) {
            display.innerHTML= "INDETERMINATE"
            setTimeout( () => {
                display.innerHTML = "0"
                saveDisplay = "0"
                float = false
                init = true 
                hiddenNumber = 0 
                currentOp = "false"
                auxSolve = 0
                solve = 0
            }, 2000)
        } else {
            console.log("vamos a realizar la operación de " + currentOp)
            auxSolve = hiddenNumber + currentOp + saveDisplay
            console.log(auxSolve)
            solve = eval(auxSolve)
            display.innerHTML= solve
            saveDisplay = solve
            currentOp = "false"
            init = true
        }
    }
}

const btnC = () => {
    display.innerHTML= "CLEAR ALL"
    setTimeout( () => {
    display.innerHTML = "0"
    saveDisplay = "0"
    float = false
    init = true 
    hiddenNumber = 0 
    currentOp = "false"
    auxSolve = 0
    solve = 0
    }, 2000)
}