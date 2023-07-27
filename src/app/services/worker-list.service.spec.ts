import { TestBed } from '@angular/core/testing';

import { WorkerListService } from './worker-list.service';

describe('WorkerListService', () => {
  let service: WorkerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
