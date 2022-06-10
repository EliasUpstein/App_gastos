var datos = [];     //Array de manejo general de la app

//Función que calcula el total del gasto y la división equitativa
function calcular() {
    let total = 0;
    let pagarcu = 0;
    
    for (let obj of datos) {
        total += parseFloat(obj.monto);
    }

    pagarcu = parseFloat(total / parseInt(datos.length)).toFixed(2);

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

//Función que ingresa los datos al array  a través de crearObjeto y verifica el ingreso del monto
function agregar(nombre, monto, cobro, fecha){

    if(monto === undefined || monto === NaN || monto == "")
        alert("¡Monto inválido!");
    else{
        datos.push(crearObjeto(nombre, monto, cobro, fecha));

        imprimir();
        calcular();
    }
}

//Función que borra un objeto del array a través del nombre recibido
function borrar(name) {

    for (const obj of datos) {
        if (obj.nombre == name) {
            datos.splice(datos.indexOf(obj),1);
            break;      //Rompe el bucle para que borre la primer referencia
        }
    }

    imprimir();
    calcular();
}

//Función que imprime los datos que se van ingresando desde el array
function imprimir() {
    let nuevo = document.getElementById("datos");
    nuevo.innerHTML = ""
    for (let i = 0; i < datos.length; i++) {
        nuevo.innerHTML += `
        <div class="">
        <p>${datos[i].nombre} gastó: $${datos[i].monto} en ${datos[i].cobro} el ${datos[i].fecha}</p>
        </div>
        `;
    }
}

//Función que descarga un json con los datos ingresados hasta el momento
function descargar() {
    //Las llaves en datos son porque sino genera el json como un array
    let file = new Blob([JSON.stringify({datos})], {type: "application/json"});
    let link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "datos.json";
    link.click();
}

//Función que lee datos ingresados del json especificado
function cargar() {
    fetch("datos.json")
        .then(respuesta => respuesta.json())
        .then(json => {
            for (let i = 0; i < json.datos.length; i++) 
            {agregar(json.datos[i].nombre, json.datos[i].monto, json.datos[i].cobro, json.datos[i].fecha);}
        })  //(objeto grande (json)).(array (datos))[posicion (i)].clave
}

//Función que crea el objeto con los datos recibidos para mejorar legibilidad y posterior mejora
function crearObjeto(nombre, monto, cobro, fecha) {
    return {
        nombre: nombre,
        monto: monto,
        cobro: cobro,
        fecha: fecha,
    }
}

//Función para el retorno del tiempo actual llamada unicamente cuando se ingresa un dato nuevo
//para sí no sobreescribir un dato leido del json. (Se la llama desde el html)
function retornarTiempo() {
    return new Date().toLocaleString();
}