import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaUsuarioComponent } from './fila-usuario.component';

describe('FilaUsuarioComponent', () => {
  let component: FilaUsuarioComponent;
  let fixture: ComponentFixture<FilaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
