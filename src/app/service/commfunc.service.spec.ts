import { TestBed } from '@angular/core/testing';

import { CommfuncService } from './commfunc.service';

describe('CommfuncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommfuncService = TestBed.get(CommfuncService);
    expect(service).toBeTruthy();
  });
});
