import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeptosComponent } from './lista-deptos.component';

describe('ListaDeptosComponent', () => {
  let component: ListaDeptosComponent;
  let fixture: ComponentFixture<ListaDeptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDeptosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
