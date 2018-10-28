import { TestBed } from '@angular/core/testing';

import { GifService } from './gif.service';

describe('GifService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GifService = TestBed.get(GifService);
    expect(service).toBeTruthy();
  });
});
