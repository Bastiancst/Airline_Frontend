import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private dataService: DataService<string>, private router: Router) 
  {

  }

  setValue(value: string) 
  { 
    this.dataService.setData(value); 
    this.router.navigate(['/authentication/modify-password']);
  }

}
