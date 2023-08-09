function convertir() {
    var monto = parseInt(document.getElementById("valor").value);
    var resultado = 0;
    var dolar = 593; 
    var euro = 654;
    if (document.getElementById("primera").checked){
        resultado = monto / dolar;
        alert("El cambio de Pesos a Dolares es $" + resultado.toFixed(2));
    }
    else if (document.getElementById("segunda").checked){
        resultado = monto / euro;
        alert("El cambio de Pesos a Euros es $" + resultado.toFixed(2));
    }
    else{
        alert("Debes completar los campos requeridos.")
    }
}