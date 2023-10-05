import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  numInputs: number = 6;
  constructor() {}

  ngOnInit(): void {}

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
    console.log("Concatenated result:", sixDigitCode);
    alert(sixDigitCode);
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
