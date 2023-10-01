import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent {
  constructor(private dataService: DataService<string>) {}

  
  message$ = this.dataService.data$;
  
}
