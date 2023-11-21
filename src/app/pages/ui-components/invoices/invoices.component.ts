import { Component, OnInit } from '@angular/core';
import { PassengerInfo } from '../buy-passengers/models/passengerInfo';
import { Invoices } from '../user-panel/models/invoices';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  dataSource: any; 
  public invoices: Invoices[] = []; //Aqui estaba el error, estaba mal definida la matriz
  InvoicesModel: Invoices;
  invoicesData: any;
  clientData : any;
  clientInfoArray: any[] = [];
  public clientInfo = {
    id: '',
    name: '',
    addres: '',
    phoneNumber: '',
    email: '',
  };
  
  firstDisplayedColumns: string[] = ['name', 'addres', 'phoneNumber', 'email'];
  secondDisplayedColumns: string[] = ['Id', 'Amount', 'Date', 'BuyOrder'];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private dataService: DataService<any>,
    private clientService: DataService<PassengerInfo>,
    private router: Router
  ) {
   this.dataSource = [...this.invoices]
  }
  goBack(): void {
    this.router.navigate(['/ui-components/user-panel']);
  }
  ngOnInit(): void {
    this.dataService.data$.subscribe(data => {
      this.clientData = data[0];
      this.invoicesData = data[1];
      console.log(this.clientData, this.invoicesData)
      this.InvoicesModel = new Invoices(this.invoicesData?.Id!, this.invoicesData?.Amount!, this.invoicesData?.Date!, this.invoicesData?.BuyOrder!);
      console.log(this.InvoicesModel);
      this.invoices.push(this.InvoicesModel);
      this.dataSource = [...this.invoices];
    });
    this.clientInfo = {
      id: this.clientData.id,
      name: this.clientData.name,
      addres: this.clientData.addres,
      phoneNumber: this.clientData.phoneNumber,
      email: this.clientData.email
  };  
  this.clientInfoArray.push(this.clientInfo); // Push clientInfo object into an array
  console.log(this.clientInfoArray);
  console.log(this.clientInfo)
}

}