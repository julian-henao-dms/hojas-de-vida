import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModCandidatoComponent } from './mod-candidato.component';

describe('ModCandidatoComponent', () => {
  let component: ModCandidatoComponent;
  let fixture: ComponentFixture<ModCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModCandidatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
