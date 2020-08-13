import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { RouterTestingModule } from "@angular/router/testing";

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])] }));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
