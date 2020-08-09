import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [AuthInterceptorService], imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])] }));

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.get(AuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
