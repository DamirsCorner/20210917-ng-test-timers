import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public callWithDelay(callback: () => void, timeout: number): void {
    setTimeout(callback, timeout);
  }

  public callWhileSucceeds(callback: () => boolean, timeout: number) {
    if (callback()) {
      setTimeout(() => this.callWhileSucceeds(callback, timeout), timeout);
    }
  }

  public callPeriodically(callback: () => void, timeout: number) {
    setInterval(callback, timeout);
  }
}
