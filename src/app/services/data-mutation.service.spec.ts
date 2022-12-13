import { TestBed } from '@angular/core/testing';

import { DataMutationService } from './data-mutation.service';

describe('DataMutationService', () => {
  let service: DataMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
