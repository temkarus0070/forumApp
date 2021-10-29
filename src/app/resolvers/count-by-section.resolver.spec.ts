import { TestBed } from '@angular/core/testing';

import { CountBySectionResolver } from './count-by-section.resolver';

describe('CountBySectionResolver', () => {
  let resolver: CountBySectionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CountBySectionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
