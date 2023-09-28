import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Router } from '@angular/router';
import './login.component.js';
declare var avanzarInput: any; //Declaramos la funcion como variable global
declare var concaternarNumeros: any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
})
export class AppSideLoginComponent implements OnInit {

  constructor(private apiService: ApiRequestService, private router: Router) {}
  
  ngOnInit(): void {
    avanzarInput();
    concaternarNumeros()
     // Llamada a la función después de la importación
  }
}
