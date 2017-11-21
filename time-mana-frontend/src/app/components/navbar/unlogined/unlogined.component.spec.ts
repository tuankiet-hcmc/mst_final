import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloginedComponent } from './unlogined.component';

describe('UnloginedComponent', () => {
  let component: UnloginedComponent;
  let fixture: ComponentFixture<UnloginedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloginedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloginedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
