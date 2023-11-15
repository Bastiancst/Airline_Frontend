import { Component, OnInit } from '@angular/core';
import { PassengerInfo } from '../buy-passengers/models/passengerInfo';
import { Invoices } from '../user-panel/models/invoices';
import { ActivatedRoute } from '@angular/router';
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
  
  firstDisplayedColumns: string[] = ['Name', 'Lastname', 'IdentityDocument', 'Email'];
  secondDisplayedColumns: string[] = ['Id', 'Amount', 'Date', 'BuyOrder'];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private dataService: DataService<Invoices>
  ) {
   this.dataSource = [...this.invoices]
  }

  ngOnInit(): void {
    this.dataService.data$.subscribe(data => {
      this.InvoicesModel = new Invoices(data?.Id!, data?.Amount!, data?.Date!, data?.BuyOrder!);

      console.log(this.InvoicesModel);

      this.invoices.push(this.InvoicesModel);
      this.dataSource = [...this.invoices];
    });
  }

}