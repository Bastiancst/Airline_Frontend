import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-buy',
  templateUrl: './view-buy.html',
  styleUrls: ['./view-buy.scss'],
})
export class ViewBuyComponent implements OnInit {
  isPaid: any;
  type: string | undefined;
  segundos: number = 10;
  rejectionImage: string = './assets/images/payment/Pago_rechazado.png';

  constructor(private _router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      this.isPaid = data['isPaid'];
      this.type = data['type'];
      console.log(this.isPaid);
      console.log(this.type);

      // Setea la ruta de la imagen de rechazo si isPaid es falso
      if (this.isPaid === 'false') {
        this.rejectionImage = './assets/images/payment/Pago_rechazado.png';
      }

      // Inicia la cuenta regresiva independientemente del valor de isPaid
      setTimeout(() => {
        this.cuentaRegresiva();
      }, 1000);
    });
  }

  cuentaRegresiva() {
    if (this.segundos > 0) {
      this.segundos--;
      setTimeout(() => {
        this.cuentaRegresiva();
      }, 1000);
    } else {
      this.redirect();
    }
  }

  redirect() {
    console.log('Redirigiendo...');
    // Verifica si isPaid es true y el tipo está presente antes de redirigir
    if (this.isPaid === 'true' && this.type) {
      switch (this.type) {
        case 'assignment':
          this._router.navigate(['/ui-components/assigment']);
          break;
        case 'flight':
          this._router.navigate(['/ui-components/flight-information']);
          break;
        default:
          console.error('Tipo no reconocido:', this.type);
      }
    } else if (this.isPaid === 'false') {
      console.log('La compra no fue realizada.');
      // Redirige a otra ventana en caso de isPaid false
      this._router.navigate(['/ui-components/user-panel']);
    } else {
      console.error('No se proporcionó un tipo en la URL o isPaid no es true/false.');
      // Maneja otro caso no previsto
      // Puedes ajustar esta parte según tus necesidades
    }
  }
}
