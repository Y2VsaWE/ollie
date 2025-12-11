import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditProgressComponent } from './edit-progress.component';

describe('EditProgressComponent', () => {
  let component: EditProgressComponent;
  let fixture: ComponentFixture<EditProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EditProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
