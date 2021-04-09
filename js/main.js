window.onload = () => {
    display = document.getElementById("display-calculator")
}

let saveDisplay = "0" //Display inicial = 0
let float = false // Para tener decimales en pantalla
let init = false //Variable de inicicialización del número

const readDisplay = (num) => {//Captura el número pulsado
    if (saveDisplay == "0" || init == true) {//inicializa
        display.innerHTML = num//muestra en pantalla
        saveDisplay = num //guardamos el número
        if (num == ".") {// si recibimos un decimal al inicio del número
            display.innerHTML = "0."// escribimos cero segido del decimal
            saveDisplay = num
            float = true
        }
    } else {//continuar
        if (num == "." && float == false ) {//si escribimos una coma decimal por primera vez
            display.innerHTML+= num //capturamos y mostramos en el display
            saveDisplay+=num //actualizamos el número
            float == true
        } else if (num == "." && float == true) {// Bloqueamos el decimal si ya existía uno
            console.error("Ya está trabajando con decimales")
        } else {//Para el resto de los casos simplemente escribe números del 0 al 9
            display.innerHTML+= num //capturamos y mostramos en el display
            saveDisplay+=num //actualizamos el número
        }
    }
    init = false //número inicializado, podemos ampliarlo
}