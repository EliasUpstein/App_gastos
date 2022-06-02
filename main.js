var nombres = [];
var montos = [];
var total = 0;
var pagar = 0;

function calcular() {
    total = 0;
    pagar = 0;
    for (const monto of montos) {
        total += parseFloat(monto);
    }
    pagar = parseFloat(total / montos.length);

    let pagarid = document.getElementById("pagar");
    document.getElementById("pagar").innerHTML = ""

    pagarid.innerHTML += `
    <div id="">
    <p>El total gastado fue: $${total}</p>
    <p>Cada uno debe pagar: $${pagar}</p>
    </div>
    `
}

function agregar(nombre, monto){
    nombre.push(nombre);
    montos.push(monto);
    imprimir();
    calcular();
}

function borrar() {
    let name = prompt("Ingrese nombre a borrar:");
    let indice = nombres.indexOf(name);
    nombres.splice(indice,1);
    nombres.splice(indice,1);
    imprimir();
}

function imprimir() {
    let nuevo = document.getElementById("datos");
    document.getElementById("datos ").innerHTML = ""
    for (let i = 0; i < montos.length; i++) {
        nuevo.innerHTML += `
        <div class="">
        <p>${nombres[i]} gasto: $${montos[i]}
        </div>
        `;
    }
}