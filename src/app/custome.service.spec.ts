import { TestBed } from '@angular/core/testing';

import { CustomeService } from './custome.service';

describe('CustomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomeService = TestBed.get(CustomeService);
    expect(service).toBeTruthy();
  });
});
