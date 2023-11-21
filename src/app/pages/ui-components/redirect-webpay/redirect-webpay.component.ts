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
  formTemplate: any;

  constructor(private dataService: DataService<PaymentResponse>){
    this.getParameters();
  }

  ngOnInit(): void {
    var form = document.createElement("form");
    var input = document.createElement("input");

    form.id = "paymentForm";
    form.method = "post";
    form.action = this.url;

    input.type = "hidden";
    input.name = "token_ws";
    input.value = this.token;

    form.appendChild(input);
    
    document.body.appendChild(form);

    this.form = document.getElementById("paymentForm");

    this.form.submit();
  }

  getParameters(){
    this.dataService.data$.subscribe(
      data => {
        this.data = data;
        this.token = this.data.token;
        this.url = this.data.url;
        console.log('url: ' + this.url);
        console.log('token: ' + this.token);
      }
    );
  }

}
