import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-passenger',
  templateUrl: './edit-passenger.component.html'
})
export class EditPassengerComponent {

  constructor(
    public dialogRef: MatDialogRef<EditPassengerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {passenger: any}) {} // 'any' debería ser reemplazado por tu tipo de datos de pasajero

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // Aquí podrías implementar una validación de los datos ingresados
    this.dialogRef.close(this.data.passenger);
  }
}
