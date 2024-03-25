import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditserviceasadminComponent } from './editserviceasadmin.component';

describe('EditserviceasadminComponent', () => {
  let component: EditserviceasadminComponent;
  let fixture: ComponentFixture<EditserviceasadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditserviceasadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditserviceasadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
