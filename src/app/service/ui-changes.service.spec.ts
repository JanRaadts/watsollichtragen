import { TestBed } from '@angular/core/testing';

import { UiChangesService } from './ui-changes.service';

describe('UiChangesService', () => {
  let service: UiChangesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
