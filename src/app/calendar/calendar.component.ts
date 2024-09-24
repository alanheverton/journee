import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

// Interface para representar um compromisso
interface Appointment {
  uuid?: string;
  date: Date;
  title: string;
  startTime: string;
  endTime: string;
  color?: string;
}

// Enum para definir as visualizações do calendário
export enum CalendarView {
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  viewDate: Date = new Date(); // Data atual da visualização
  selectedDate: Date | null = null; // Data selecionada
  selectedStartTime: string | undefined; // Hora de início selecionada
  weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']; // Dias da semana
  monthDays: Date[] = []; // Dias do mês
  appointments: Appointment[] = [
    {
      uuid: '00000000-0000-0000-0000-000000000014',
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      title: 'Reunião',
      startTime: '11:00',
      endTime: '12:00',
    },
  ]; // Lista de compromissos
  currentView: CalendarView = CalendarView.Month; // Visualização atual
  timeSlots: string[] = []; // Intervalos de tempo
  weeks: Date[][] = []; // Semanas do mês
  public CalendarView = CalendarView; // Exposição do enum para o template

  constructor(public dialog: MatDialog) {
    // Atribui cores aleatórias aos compromissos
    this.appointments.forEach((appointment) => {
      appointment.color = this.getRandomColor();
    });
    this.generateView(this.currentView, this.viewDate); // Gera a visualização inicial
    this.generateTimeSlots(); // Gera os intervalos de tempo
  }

  // Gera a visualização do calendário com base na visualização atual
  generateView(view: CalendarView, date: Date) {
    switch (view) {
      case CalendarView.Month:
        this.generateMonthView(date);
        break;
      case CalendarView.Week:
        this.generateWeekView(date);
        break;
      case CalendarView.Day:
        this.generateDayView(date);
        break;
      default:
        this.generateMonthView(date);
    }
  }

  // Gera a visualização mensal
  generateMonthView(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.weeks = [];
    this.monthDays = [];
    let week: Date[] = [];

    // Preenche dias anteriores ao início do mês
    for (let day = start.getDay(); day > 0; day--) {
      const prevDate = new Date(start);
      prevDate.setDate(start.getDate() - day);
      week.push(prevDate);
      this.monthDays.push(prevDate);
    }

    // Adiciona dias do mês atual
    for (let day = 1; day <= end.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      this.monthDays.push(currentDate);
      week.push(currentDate);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    // Preenche dias após o final do mês para completar a semana
    for (let day = 1; this.monthDays.length % 7 !== 0; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      this.monthDays.push(nextDate);
    }

    for (let day = 1; week.length < 7; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      week.push(nextDate);
    }

    if (week.length > 0) {
      this.weeks.push(week);
    }
  }

  // Gera a visualização semanal
  generateWeekView(date: Date) {
    const startOfWeek = this.startOfWeek(date);
    this.monthDays = [];

    for (let day = 0; day < 7; day++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + day);
      this.monthDays.push(weekDate);
    }
  }

  // Gera a visualização diária
  generateDayView(date: Date) {
    this.monthDays = [date];
  }

  // Gera os intervalos de tempo para o dia
  generateTimeSlots() {
    for (let hour = 0; hour <= 24; hour++) {
      const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      this.timeSlots.push(time);
    }
  }

  // Alterna entre diferentes visualizações do calendário
  switchToView(view: CalendarView) {
    this.currentView = view;
    this.generateView(this.currentView, this.viewDate);
  }

  // Calcula o início da semana para uma dada data
  startOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(start.setDate(diff));
  }

  // Navega para a visualização anterior
  previous() {
    if (this.currentView === 'month') {
      this.viewDate = new Date(
        this.viewDate.setMonth(this.viewDate.getMonth() - 1)
      );
      this.generateMonthView(this.viewDate);
    } else if (this.currentView === 'week') {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() - 7)
      );
      this.generateWeekView(this.viewDate);
    } else {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() - 1)
      );
      this.generateDayView(this.viewDate);
    }
  }

  // Navega para a próxima visualização
  next() {
    if (this.currentView === 'month') {
      this.viewDate = new Date(
        this.viewDate.setMonth(this.viewDate.getMonth() + 1)
      );
      this.generateMonthView(this.viewDate);
    } else if (this.currentView === 'week') {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() + 7)
      );
      this.generateWeekView(this.viewDate);
    } else {
      this.viewDate = new Date(
        this.viewDate.setDate(this.viewDate.getDate() + 1)
      );
      this.generateDayView(this.viewDate);
    }
  }

  // Verifica se uma data é o dia atual
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  // Verifica se uma data é a data selecionada
  isSelected(date: Date): boolean {
    if (!this.selectedDate) {
      return false;
    }
    return (
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear()
    );
  }

  // Verifica se duas datas são iguais
  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  // Seleciona uma data e abre o diálogo
  selectDate(date?: Date, startTime?: string) {
    if (date) {
      this.selectedDate = date;
    } else {
      this.selectedDate = new Date();
    }
    this.selectedStartTime = startTime;
    this.openDialog();
  }

  // Gera um UUID aleatório
  generateUUID(): string {
    let d = new Date().getTime(); // Timestamp
    let d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  // Adiciona um novo compromisso
  addAppointment(
    date: Date,
    title: string,
    startTime: string,
    endTime: string
  ) {
    this.appointments.push({
      uuid: this.generateUUID(),
      date,
      title,
      startTime,
      endTime,
      color: this.getRandomColor(),
    });
  }

  // Remove um compromisso
  deleteAppointment(appointment: Appointment, event: Event) {
    event.stopPropagation();
    const index = this.appointments.indexOf(appointment);
    if (index > -1) {
      this.appointments.splice(index, 1);
    }
  }

  // Abre o diálogo para adicionar/editar compromisso
  openDialog(): void {
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const h = hour < 10 ? `0${hour}` : hour;
    const m = minutes < 10 ? `0${minutes}` : minutes;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: {
        date: this.selectedDate,
        title: '',
        startTime: this.selectedStartTime || `${h}:${m}`,
        endTime: this.selectedStartTime || `${h}:${m}`,
      },
    });

    // Após fechar o diálogo, adiciona o compromisso se houver resultado
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addAppointment(
          result.date,
          result.title,
          result.startTime,
          result.endTime
        );
      }
    });
  }

  // Obtém compromissos para uma data específica
  getAppointmentsForDate(day: Date, timeSlots: string[]) {
    return this.appointments
      .filter((appointment) => {
        return this.isSameDate(appointment.date, day);
      })
      .map((appointment) => {
        const startTimeIndex = timeSlots.indexOf(appointment.startTime);
        const endTimeIndex = timeSlots.indexOf(appointment.endTime);
        return { ...appointment, startTimeIndex, endTimeIndex };
      });
  }

  // Ação de arrastar e soltar para compromissos
  drop(event: CdkDragDrop<Appointment[]>, date: Date, slot?: string) {
    const movedAppointment = event.item.data;
    movedAppointment.date = date;
    if (slot) {
      movedAppointment.startTime = slot;
      movedAppointment.endTime = slot;
    }
  }

  // Define a visualização para o dia atual
  viewToday(): void {
    this.viewDate = new Date();
    this.generateMonthView(this.viewDate);
  }

  // Verifica se uma data pertence ao mês atual
  isCurrentMonth(date: Date): boolean {
    return (
      date.getMonth() === this.viewDate.getMonth() &&
      date.getFullYear() === this.viewDate.getFullYear()
    );
  }

  // Obtém compromissos para uma data e horário específicos
  getAppointmentsForDateTime(date: Date, timeSlot: string): Appointment[] {
    const appointmentsForDateTime: Appointment[] = this.appointments.filter(
      (appointment) =>
        this.isSameDate(appointment.date, date) &&
        appointment.startTime <= timeSlot &&
        appointment.endTime >= timeSlot
    );

    return appointmentsForDateTime;
  }

  // Gera uma cor aleatória para compromissos
  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = 0.4;
    return `rgba(${r},${g},${b},${a})`;
  }

  // Edita um compromisso existente
  editAppointment(appointment: Appointment, event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: appointment,
    });

    // Após fechar o diálogo, atualiza ou remove o compromisso
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.appointments.findIndex(
          (appointment) => appointment.uuid === result.uuid
        );
        if (result.remove) {
          this.appointments.splice(index, 1);
        } else {
          this.appointments[index] = result;
        }
      }
    });
  }
}
