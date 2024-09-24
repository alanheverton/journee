import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

// Define as rotas para o módulo de calendário
const routes: Routes = [{ path: '', component: CalendarComponent }];

@NgModule({
  // Declara o componente CalendarComponent
  declarations: [CalendarComponent],
  // Importa módulos necessários para o funcionamento do módulo
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIconModule,
    DragDropModule,
    AppointmentDialogComponent,
    RouterModule.forChild(routes), // Configura as rotas do módulo
  ],
})
// Define o módulo CalendarModule
export class CalendarModule {}
