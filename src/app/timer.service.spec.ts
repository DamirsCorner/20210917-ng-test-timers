import {
  discardPeriodicTasks,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;
  let callbackSpy: jasmine.Spy<() => boolean>;

  beforeEach(() => {
    callbackSpy = jasmine.createSpy();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('callWithDelay', () => {
    it('should not call callback immediately', fakeAsync(() => {
      service.callWithDelay(callbackSpy, 50);

      expect(callbackSpy).not.toHaveBeenCalled();

      flush();
    }));

    it('should call callback after the timeout', fakeAsync(() => {
      service.callWithDelay(callbackSpy, 50);

      tick(50);

      expect(callbackSpy).toHaveBeenCalled();
    }));
  });

  describe('callWhileSucceeds', () => {
    it('should call callback once if it fails', fakeAsync(() => {
      callbackSpy.and.returnValue(false);

      service.callWhileSucceeds(callbackSpy, 50);

      tick(50);

      expect(callbackSpy).toHaveBeenCalledTimes(1);
    }));

    it('should call callback again if it succeeds', fakeAsync(() => {
      callbackSpy.and.returnValue(true);

      service.callWhileSucceeds(callbackSpy, 50);

      tick(50);

      expect(callbackSpy).toHaveBeenCalledTimes(2);

      callbackSpy.and.returnValue(false);
      flush();
    }));
  });

  describe('should call callback after the timeout', () => {
    it('should not call callback immediately', fakeAsync(() => {
      service.callPeriodically(callbackSpy, 50);

      expect(callbackSpy).not.toHaveBeenCalled();

      discardPeriodicTasks();
    }));

    it('should call callback after the timeout', fakeAsync(() => {
      service.callPeriodically(callbackSpy, 50);

      tick(50);

      expect(callbackSpy).toHaveBeenCalled();

      discardPeriodicTasks();
    }));
  });
});
