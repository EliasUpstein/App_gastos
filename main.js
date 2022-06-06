var nombres = [];
var montos = [];
var total = 0;
var pagarcu = 0;

function calcular() {
    total = 0;
    pagarcu = 0;
    
    for (let monto of montos) {
        total += parseFloat(monto);
    }
    pagarcu = parseFloat(total / parseInt(montos.length)).toFixed(2);

    if(total === undefined || total === NaN || total == "")
        total = parseFloat(0).toFixed(2);

    if(pagarcu === undefined || pagarcu === NaN || pagarcu == "")
        pagarcu = parseFloat(0).toFixed(2);

    let pagarid = document.getElementById("pagar");
    document.getElementById("pagar").innerHTML = ""

    pagarid.innerHTML += `
    <p>El total gastado fue: $${total}</p>
    <p>Cada uno debe pagar: $${pagarcu}</p>
    `
}

function agregar(nombre, monto){

    if(monto === undefined || monto === NaN || monto == "")
        monto = parseInt(0);

    nombres.push(nombre);
    montos.push(monto);
    imprimir();
    calcular();
}

function borrar(nombre) {
    let indice = nombres.indexOf(nombre);
    nombres.splice(indice,1);
    montos.splice(indice,1);
    imprimir();
    calcular();
}

function imprimir() {
    let nuevo = document.getElementById("datos");
    document.getElementById("datos").innerHTML = ""
    for (let i = 0; i < montos.length; i++) {
        nuevo.innerHTML += `
        <div class="">
        <p>${nombres[i]} gasto: $${montos[i]}
        </div>
        `;
    }
}