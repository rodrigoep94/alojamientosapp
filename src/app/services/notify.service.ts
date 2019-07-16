import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotifyService {
  notifications: string[] = [];
  private notificationsBehavior = new BehaviorSubject<string[]>(this.notifications);

  public getNotificationsObservable(): Observable<string[]> | string[] {
    return this.notificationsBehavior.asObservable();
  }

  constructor() { }

  add(msj: string): void {
    var storage = this.getNotifications();

    storage.push(msj);

    this.setNotifications(storage);
    console.log(this.getNotifications());
  }

  setNotifications(storage: string[]): void {
    sessionStorage.setItem('notify:items', JSON.stringify(storage));
    this.notificationsBehavior.next(storage);
  }

  getNotifications(): string[] {
    var item = JSON.parse(sessionStorage.getItem('notify:items') || '[]');
    console.log(item);
    return item;
  }

  clearNotifications(): void {
    this.setNotifications([]);
  }
}
