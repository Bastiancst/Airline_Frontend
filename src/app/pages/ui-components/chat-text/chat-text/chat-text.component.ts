import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';  // Agregamos la importación de HttpClient
import { CoookieService } from 'src/app/services/cookie.service';
import { LoginResponse } from 'src/app/pages/authentication/models/login-response';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-chat-text',
  templateUrl: './chat-text.component.html',
  styleUrls: ['./chat-text.component.scss']
})
export class ChatTextComponent implements OnInit {
  private hubConnection: signalR.HubConnection | undefined;
  messages: { clientId: string, employeeId: string, message: string }[] = [];
  message = '';
  user = 'Anonymous';
  clientId = ''; // Agrega el identificador del cliente
  employeeId = ''; // Agrega el identificador del empleado
  showChat = true; // Modificado para que el chat aparezca automáticamente

  @ViewChild('chatContainer') chatContainer: ElementRef | undefined;

  constructor(private cdRef: ChangeDetectorRef, private httpClient: HttpClient, private CookieService: CoookieService, private ApiService: ApiRequestService) {
  }  // Inyectamos HttpClient en el constructor

  getUserInfoByToken(){
    this.ApiService.getUserByToken<LoginResponse>('/api/account/user', this.CookieService.getToken()).subscribe(
      response => {
        console.log(response);
        if(response.success){
          this.clientId= response.result.id;
          this.getUserInfo();
          console.log(this.clientId);
        }  
      },
      error => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  getUserInfo(){
    this.ApiService.post<any, any>('/api/client/' + this.clientId, this.clientId).subscribe(
      response => {
        if(response.success){
          this.employeeId= response.result.employeeId;
          console.log(this.employeeId);
          this.chat();
        }
      },
      error => { 
        console.error("error getUserInfo: ", error);
      }
    )
  }

  ngOnInit() {
    this.getUserInfoByToken();
  }

  async sendMessage() {
    if (this.message) {
      if (this.hubConnection) {
        console.log('Connection state before sending message:', this.hubConnection.state);
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
          try {
            await this.hubConnection?.invoke('SendMessage', this.clientId, this.employeeId, this.message);

            //this.messages.push({ clientId: this.clientId, employeeId: this.employeeId, message: this.message });
            this.message = '';
            this.scrollToBottom();
            this.cdRef.detectChanges();
          } catch (err) {
            console.error('Error while sending message: ' + err);
          }
        } else {
          console.warn('Connection is not in the Connected state. Unable to send message.');
        }
      } else {
        console.warn('Hub connection is null. Unable to send message.');
      }
    }
  }

  async chat(){
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://a99e-200-27-88-4.ngrok-free.app/chatHub') // Reemplaza con la URL de tu backend
      .build();

    try {
      await this.hubConnection.start();
      console.log('Connection started');
      console.log('Connection state:', this.hubConnection.state);
    } catch (err) {
      console.log('Error while starting connection: ' + err);
    }

    this.hubConnection.on('ReceiveMessage', (clientId: string, employeeId: string, message: string) => {
      this.messages.push({ clientId, employeeId, message });
      this.scrollToBottom();
      this.cdRef.detectChanges();
    });
  }

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
