import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaEspecialistaComponent } from './fila-especialista.component';

describe('FilaEspecialistaComponent', () => {
  let component: FilaEspecialistaComponent;
  let fixture: ComponentFixture<FilaEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilaEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
