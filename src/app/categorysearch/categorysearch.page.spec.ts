import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategorysearchPage } from './categorysearch.page';

describe('CategorysearchPage', () => {
  let component: CategorysearchPage;
  let fixture: ComponentFixture<CategorysearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorysearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategorysearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
