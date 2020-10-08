import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmasterUsersComponent } from './addmaster-users.component';

describe('AddmasterUsersComponent', () => {
  let component: AddmasterUsersComponent;
  let fixture: ComponentFixture<AddmasterUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmasterUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmasterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
