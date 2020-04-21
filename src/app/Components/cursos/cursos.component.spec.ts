import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursosComponent } from './cursos.component';

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
