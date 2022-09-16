import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedInComponent } from './locked-in.component';

describe('LockedInComponent', () => {
  let component: LockedInComponent;
  let fixture: ComponentFixture<LockedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LockedInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
