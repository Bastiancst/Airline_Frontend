import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { PaymentResponse } from '../buy-passengers/models/paymentResponse';

@Component({
  selector: 'app-redirect-webpay',
  templateUrl: './redirect-webpay.component.html',
  styleUrls: ['./redirect-webpay.component.scss']
})
export class RedirectWebpayComponent implements OnInit{

  data: any;
  token: any;
  url: any;
  form: any;

  constructor(private dataService: DataService<PaymentResponse>){
    this.getParameters();
  }

  ngOnInit(): void {
    this.form = document.getElementById("paymentForm");
    console.log(this.form);
    this.form.submit();
  }

  getParameters(){
    this.dataService.data$.subscribe(
      data => {
        this.data = data;
        this.token = this.data.token;
        this.url = this.data.url;
        console.log(this.url, this.token, this.form);
        //this.form.submit();
      }
    );
  }

}
