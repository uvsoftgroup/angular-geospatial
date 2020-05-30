import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawModifyVectorFeatureFormComponent } from './draw-modify-vector-feature-form.component';

describe('DrawModifyVectorFeatureFormComponent', () => {
  let component: DrawModifyVectorFeatureFormComponent;
  let fixture: ComponentFixture<DrawModifyVectorFeatureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawModifyVectorFeatureFormComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawModifyVectorFeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
