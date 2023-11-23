import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import * as signalR from '@microsoft/signalr';

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

  constructor(private cdRef: ChangeDetectorRef) {}

  async ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://46ff-200-27-88-4.ngrok-free.app/chatHub') // Reemplaza con la URL de tu backend
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
            await this.hubConnection?.invoke('SendMessage', this.clientId, this.employeeId, this.message);
            // Actualizar la interfaz de usuario inmediatamente después de enviar el mensaje
            this.messages.push({ clientId: this.clientId, employeeId: this.employeeId, message: this.message });
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