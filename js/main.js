window.onload = () => {
    display = document.getElementById("display-calculator")
}

let saveDisplay = "0" //Display inicial = 0
let float = false // Para tener decimales en pantalla
let init = true //Variable de inicicialización del número

const captureBtn = (num) => {//Captura el número pulsado
    if ((saveDisplay == "0" || init == true) && num != ".") {//inicializa
        display.innerHTML = num//muestra en pantalla
        saveDisplay = num //guardamos el número
        console.log("primera comprobación de float, el primer numero ingresado no es un decimal " + float)
    } else if ((saveDisplay == "0" || init == true) && num == ".") {
        display.innerHTML = "0."//muestra en pantalla
        saveDisplay = num //guardamos el número
        float = true
        console.log("primera comprobación de float, el primer número ingresado es un decimal " + float)
    } else if (num == "." && float == false && num == "0") {// si recibimos un decimal al inicio del número
        display.innerHTML = "0."// escribimos cero segido del decimal
        saveDisplay = num
        float = true
        console.log("segunda comprobación de float display en 0 " + float)
    
    } else if (num == "." && float == false) {
        display.innerHTML+= "."// escribimos cero segido del decimal
        saveDisplay = num
        float = true
        console.log("segunda comprobación de float display no está en 0 " + float)
    } else {//continuar
        if (num == "." && float == false ) {//si escribimos una coma decimal por primera vez
            display.innerHTML+= num //capturamos y mostramos en el display
            saveDisplay+=num //actualizamos el número
            float == true
            console.log("tercera comprobación de float " + float)
        } else if (num == "." && float == true) {// Bloqueamos el decimal si ya existía uno
            console.error("Ya está trabajando con decimales")
            console.log("cuarta comprobación de float " + float)
        } else {//Para el resto de los casos simplemente escribe números del 0 al 9
            display.innerHTML+= num //capturamos y mostramos en el display
            saveDisplay+=num //actualizamos el número
            console.log("quinta comprobación de float " + float)
        }
    }
    init = false //número inicializado, podemos ampliarlo
}