import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';

// Descrição do teste para o componente CalendarComponent
describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    // Configuração do módulo de teste para o CalendarComponent
    await TestBed.configureTestingModule({
      imports: [CalendarComponent]
    })
    .compileComponents();

    // Criação da instância do componente para o teste
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verifica se o componente foi criado com sucesso
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
