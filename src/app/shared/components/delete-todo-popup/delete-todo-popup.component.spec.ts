import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTodoPopupComponent } from './delete-todo-popup.component';

describe('DeleteTodoPopupComponent', () => {
  let component: DeleteTodoPopupComponent;
  let fixture: ComponentFixture<DeleteTodoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTodoPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTodoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
