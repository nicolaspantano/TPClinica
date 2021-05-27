import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaPacienteComponent } from './fila-paciente.component';

describe('FilaPacienteComponent', () => {
  let component: FilaPacienteComponent;
  let fixture: ComponentFixture<FilaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilaPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
