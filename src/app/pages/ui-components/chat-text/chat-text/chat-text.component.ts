import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';  // Agregamos la importación de HttpClient

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

  constructor(private cdRef: ChangeDetectorRef, private httpClient: HttpClient) {}  // Inyectamos HttpClient en el constructor

  async ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7292/chatHub') // Reemplaza con la URL de tu backend
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

  async sendMessage() {
    if (this.message) {
      if (this.hubConnection) {
        console.log('Connection state before sending message:', this.hubConnection.state);
        if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
          try {
            await this.hubConnection?.invoke('SendMessage', '359837c4-b2e9-4cde-9df7-a69503bd664d', 'c487a34f-083d-49b3-91dc-6763b844a49f', this.message);

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

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
