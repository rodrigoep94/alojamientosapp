import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/Observable/of';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  private storageLocation = "AlojamientosLog";

  log(msg: string): Observable<boolean> {
    let ret: boolean = false;
      
    try {
      // Get previous values from local storage
      let values = JSON.parse(localStorage.getItem(this.storageLocation)) || [];
      
      // Add new log entry to array
      values.push(msg);
      
      // Store array into local storage
      localStorage.setItem(this.storageLocation, JSON.stringify(values));
      
      // Set return value
      ret = true;
    } catch (ex) {
      // Display error in console
      console.log(ex);
    }
      
    return of(ret);
  }
      
  // Clear all log entries from local storage
  clear(): Observable<boolean> {
    localStorage.removeItem(this.storageLocation);
    return of(true);
  }
}
