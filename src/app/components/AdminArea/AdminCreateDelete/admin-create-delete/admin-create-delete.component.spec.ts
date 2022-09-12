import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateDeleteComponent } from './admin-create-delete.component';

describe('AdminCreateDeleteComponent', () => {
  let component: AdminCreateDeleteComponent;
  let fixture: ComponentFixture<AdminCreateDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
