import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManualRegistrationExitComponent } from './manual-registration-exit.component';

describe('ManualRegistrationExitComponent', () => {
  let component: ManualRegistrationExitComponent;
  let fixture: ComponentFixture<ManualRegistrationExitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualRegistrationExitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManualRegistrationExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
