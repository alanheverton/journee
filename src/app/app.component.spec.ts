import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Descrição do conjunto de testes para o AppComponent
describe('AppComponent', () => {
  // Configuração do módulo de teste antes de cada teste
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], 
    }).compileComponents();
  });

  // Teste para verificar se o componente é criado corretamente
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); 
    const app = fixture.componentInstance; 
    expect(app).toBeTruthy(); 
  });

  // Teste para verificar se o título do componente é 'angular-calendar-app'
  it(`should have the 'angular-calendar-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent); 
    const app = fixture.componentInstance; 
    expect(app.title).toEqual('angular-calendar-app'); 
  });

  // Teste para verificar se o título é renderizado corretamente no template
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); 
    fixture.detectChanges(); 
    const compiled = fixture.nativeElement as HTMLElement; 
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-calendar-app');
  });
});
