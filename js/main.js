window.onload = () => {
    display = document.getElementById("display-calculator")
    document.onkeydown = keyboard
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
    float = false
}
const resolve = () => {
    decimalToCero()
    float = false
    let auxSolve //para guardar la operación
    let solve // para guardar la solución de la operación
    //estas primeras funciones dependen de un solo número
    if (currentOp == "sqrt") {
        if (saveDisplay < 0) {
            errorAction()
        } else {
            auxSolve = parseFloat(saveDisplay)
            solve = Math.sqrt(auxSolve)
            display.innerHTML= solve
            currentOp = "false"
            init = true
            saveDisplay = solve.toString()
        }
    } else if (currentOp == "porcent") {
        auxSolve = parseFloat(saveDisplay)
        solve = auxSolve / 100
        display.innerHTML = solve
        currentOp = "false"
        init = true
        saveDisplay = solve.toString()
    } else if (currentOp == "inverse") {
        if (saveDisplay == 0) {
            errorAction()
        } else {
            auxSolve = parseFloat(saveDisplay)
            solve = 1 / auxSolve
            display.innerHTML = solve
            saveDisplay = solve.toString()
            init = true
            currentOp = "false"
        }
    } else if (currentOp == "signe") {
        auxSolve = parseFloat(saveDisplay)
        solve = auxSolve * (-1)
        display.innerHTML = solve
        saveDisplay = solve.toString()
        currentOp = "false"
        init = true
    } else {//las siguientes dependen de dos números
        let n1 = parseFloat(hiddenNumber)
        let n2 = parseFloat(saveDisplay)
        if (currentOp == "+") {
            auxSolve = n1 + n2
            solve = auxSolve.toString()
            display.innerHTML= solve
            saveDisplay = solve
            currentOp = "false"
            init = true
        } else if (currentOp == "-") {
            auxSolve = n1 - n2
            solve = auxSolve.toString()
            display.innerHTML= solve
            saveDisplay = solve
            currentOp = "false"
            init = true
        } else if (currentOp == "*") {
            auxSolve = n1 * n2
            solve = auxSolve.toString()
            display.innerHTML= solve
            saveDisplay = solve
            currentOp = "false"
            init = true
        } else if (currentOp == "/") {
            if ((hiddenNumber == 0 && saveDisplay == 0) || saveDisplay == 0) {
                errorAction()
            } else {
                auxSolve = n1 / n2
                solve = auxSolve.toString()
                display.innerHTML= solve
                saveDisplay = solve
                currentOp = "false"
                init = true
            }
        }
    }
}
const equal = () => {
    // float = false
    if (currentOp == "false") {//no hay ninguna operación pendiente
        display.innerHTML = saveDisplay //nos limitamos a mostrar lo que hay en pantalla
    } else {
        resolve()
        // auxSolve = hiddenNumber + currentOp + saveDisplay
        // console.log(auxSolve)
        // solve = eval(auxSolve)
        // display.innerHTML= solve
        // saveDisplay = solve
        // currentOp = "false"
        // init = true
    }
}

const btnDel = () => {//borramos solo el último número escrito
    let figures = saveDisplay.length //figures => cifras (de números)
    let del = saveDisplay.substring(figures - 1,figures)//información sobre el último caracter escrito
    saveDisplay = saveDisplay.substring(0, figures - 1)//eliminar el último caracter
    if (saveDisplay == "") {//si no quedan caracteres, hacer cero el display
        saveDisplay = "0"
    }
    if (del == ".") {//si eliminamos el punto decimal, habilitar de nuevo el botón de decimal
        float = false
    }
    display.innerHTML = saveDisplay
}

const btnCe = () => {
    display.innerHTML= "0"
    float = false
    saveDisplay = 0
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
    }, 1000)
}

const decimalToCero = () => {
    //es para evitar obtener NaN cuando solo se le pase un puto decimal, hará que se interprete como un cero
    if (saveDisplay == ".") {
        saveDisplay = 0
    }
    if (hiddenNumber == ".") {
        hiddenNumber = 0
    }
}

const errorAction = () => {
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
    }, 1500)
}

const keyboard = (ev) => {
    const eve = ev || window.event
    let key = eve.keyCode //número de la tecla
    if ((key > 47) && (key < 58)) { //teclas númericas del teclado alfamunérico
        let code = key - 48 //buscar número a mostrar
        code = code.toString()
        captureBtn(code) //llamada a la tecla numérica correspondiente
    }
    if ((key > 95) && (key < 106)) { //Teclas del teclado númerico.
        let code = key - 96 //buscar número a mostrar
        code = code.toString()
        captureBtn(code) //llamada a la tecla numérica correspondiente
    }
    if ((key == 110) || (key == 190)) {
        captureBtn(".")
    }
    if (key == 106) {
        operation("*")
    }
    if (key==109) {
        operation('-')
    } 
    if (key==111) {
        operation('/')
    }
    if (key==32 || key==13) {
        equal()
    }
    if (key==46) {
        btnC()
    }
    if (key==36) {
        btnCe()
    }
    if (key==8) {
        btnDel()
    }
}