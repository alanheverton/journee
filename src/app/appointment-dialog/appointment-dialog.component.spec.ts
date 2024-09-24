import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentDialogComponent } from './appointment-dialog.component';

// Teste de unidade para o componente AppointmentDialogComponent
describe('AppointmentDialogComponent', () => {
  let component: AppointmentDialogComponent;
  let fixture: ComponentFixture<AppointmentDialogComponent>;

  beforeEach(async () => {
    // Configuração do módulo de teste e criação do componente
    await TestBed.configureTestingModule({
      imports: [AppointmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica se o componente foi criado com sucesso
    expect(component).toBeTruthy();
  });
});
