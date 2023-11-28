import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { VerifyCodeRequest } from '../models/verifycode-request';
import { VerifyCodeResponse } from '../models/verifycode-response';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit, OnDestroy {

  numInputs: number = 6;
  email: string | null = null;
  private unsubscribe$ = new Subject<void>();

  verifyData: VerifyCodeRequest = { email: '', recoveryCode: '' };
  
  constructor( 
    private dataService: DataService<string>, 
    private router: Router, 
    private modifyData: DataService<{email:string, code:string}>,
    private apiService: ApiRequestService
    ) {}

  ngOnInit(): void {
    this.dataService.data$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(email => {
      this.email = email;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  handleInput(event: Event, nextInputId: string, prevInputId: string): void {
    const inputElement = event.target as HTMLInputElement;
    const isBackspace = (event as KeyboardEvent).key === 'Backspace';
    if (isBackspace && inputElement.value.length === 0) {
      const prevInput = document.getElementById(prevInputId);
      if (prevInput) {
        prevInput.focus();
      }
    } else if (inputElement.value.length === 1) {
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  concatenateNumbers(): void {
    let sixDigitCode = '';
    for (let i = 1; i <= this.numInputs; i++) {
      const inputElement = document.getElementById('digit' + i) as HTMLInputElement;
      sixDigitCode += inputElement ? inputElement.value : '';
    }

    this.modifyData.setData({ email: this.email || '', code: sixDigitCode });

    this.router.navigate(['/authentication/modify-password']);
    
    
  }

  isFormComplete(): boolean {
    for (let i = 1; i <= this.numInputs; i++) {
      const inputElement = document.getElementById('digit' + i) as HTMLInputElement;
      if (!inputElement || inputElement.value.length !== 1 || isNaN(Number(inputElement.value))) {
        return false;  
      }
    }
    return true;  
  }
}
