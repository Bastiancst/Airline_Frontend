function avanzarInput(inputActual, siguienteInputId) {
    var valor = inputActual.value;
    if (valor.length === 1) {
        // Si se ha ingresado un valor, avanzar automáticamente al siguiente input
        document.getElementById(siguienteInputId).focus();
    }
}


function concatenarNumeros() {
    // Obtener los valores de los campos de entrada
    var num1 = document.getElementById("password1").value;
    var num2 = document.getElementById("password2").value;
    var num3 = document.getElementById("password3").value;
    var num4 = document.getElementById("password4").value;
    var num5 = document.getElementById("password5").value;
    var num6 = document.getElementById("password6").value;

    // Concatenar los números
    var codigoSeisDigitos = num1 + num2 + num3 + num4 + num5 + num6;

    // Mostrar el resultado en el elemento "resultado"
  alert(document.getElementById("resultado").textContent = codigoSeisDigitos);

}