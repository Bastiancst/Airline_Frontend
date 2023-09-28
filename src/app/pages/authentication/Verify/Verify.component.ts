import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-Verify',
  templateUrl: './Verify.component.html',
  styleUrls: ['./Verify.component.scss'],
})
export class AppSideVerifyComponent implements OnInit {

  constructor(private apiService: ApiRequestService, private router: Router, private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    //LLama a la funcion avanzarInput
    this.assignInputHandlers();
    // Llama a la función concatenarNumeros desde ngOnInit
    this.concatenarNumeros();
  }

// Esta función se llama cuando se ingresa un dígito en un campo
avanzarOretrocederInput(event: KeyboardEvent, siguienteInputId: string, anteriorInputId: string) {
  const inputElement = event.target as HTMLInputElement;
  const valorActual = inputElement.value;
  
  if (valorActual.length === 1) {
    const nextInput = this.elementRef.nativeElement.querySelector(`#${siguienteInputId}`);
    if (nextInput) {
      nextInput.focus();
    }
  } else if (valorActual.length === 0) {
    const previousInput = this.elementRef.nativeElement.querySelector(`#${anteriorInputId}`);
    if (previousInput) {
      previousInput.focus();
    }
  }
}

// Asignar el manejador de eventos a todos los campos de entrada
assignInputHandlers() {
  const inputIds = ['password1', 'password2', 'password3', 'password4', 'password5', 'password6'];

  inputIds.forEach((inputId, index) => {
    const nextInputId = inputIds[index + 1]; // ID del siguiente campo de entrada
    const previousInputId = inputIds[index - 1]; // ID del campo de entrada anterior
    const inputElement = this.elementRef.nativeElement.querySelector(`#${inputId}`);

    if (inputElement) {
      inputElement.addEventListener('input', (event: Event) => {
        this.avanzarOretrocederInput(event as KeyboardEvent, nextInputId, previousInputId);
      });
    }
  });
}

  concatenarNumeros() {
    // Obtener los valores de los campos de entrada
    const num1 = (<HTMLInputElement>document.getElementById("password1"))?.value;
    const num2 = (<HTMLInputElement>document.getElementById("password2"))?.value;
    const num3 = (<HTMLInputElement>document.getElementById("password3"))?.value;
    const num4 = (<HTMLInputElement>document.getElementById("password4"))?.value;
    const num5 = (<HTMLInputElement>document.getElementById("password5"))?.value;
    const num6 = (<HTMLInputElement>document.getElementById("password6"))?.value;

    // Verifica si los elementos existen antes de acceder a sus propiedades
    if (num1 !== null && num2 !== null && num3 !== null && num4 !== null && num5 !== null && num6 !== null) {
      // Concatenar los números
      const codigoSeisDigitos = num1 + num2 + num3 + num4 + num5 + num6;

      // Mostrar el resultado en la consola
      console.log("Resultado concatenado:", codigoSeisDigitos);
      alert(codigoSeisDigitos);
    }
  }
}
