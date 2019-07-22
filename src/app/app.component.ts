import { Component } from '@angular/core';
import { NotifyService } from './services/notify.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alojamientos';
  public notifications: string[];

  constructor(private notiService: NotifyService){
    
  }

  ngOnInit() {
    this.setNotificationsConfiguration();
  }
  
  get canShowNotifications(): boolean {
    return this.notifications.length > 0;
  }

  get getNotifications(): string[] {
    return this.notifications;
  }

  private setNotificationsConfiguration() {
    this.notifications = [];
    this.showNotifications();
  }

  private showNotifications(): void {
    (this.notiService.getNotificationsObservable() as Observable<string[]>).subscribe(notifications => {
      notifications.map(m => this.notifications.push(m));
      setTimeout(() => {
        this.notifications = [];
      }, 4 * 1000)

      if (notifications.length > 0) {
        this.notiService.clearNotifications();
      }
    });
  }
}
