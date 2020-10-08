import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVendorsComponent } from './my-vendors.component';

describe('MyVendorsComponent', () => {
  let component: MyVendorsComponent;
  let fixture: ComponentFixture<MyVendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
