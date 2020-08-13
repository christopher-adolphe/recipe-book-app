import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationComponent, LoaderComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize default states', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.isSignInMode).toBeTruthy();
      expect(component.isLoading).toBeFalsy();
      expect(component.error).toBeNull();
    });
  });

  it('should call onInitSignInForm method', () => {
    spyOn(component, 'onInitSignInForm')
    component.ngOnInit();
    expect(component.onInitSignInForm).toHaveBeenCalled();
  });
});
