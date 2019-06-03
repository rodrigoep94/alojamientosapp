import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  private storageLocation = "AlojamientosLog";

  log(msg: string): boolean {
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
      
    return ret;
  }
      
  // Clear all log entries from local storage
  clear(): boolean {
    localStorage.removeItem(this.storageLocation);
    return true;
  }
}
