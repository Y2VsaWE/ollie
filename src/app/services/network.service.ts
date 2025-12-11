import { Injectable } from '@angular/core';
import { Network, ConnectionStatus } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private onlineStatus = new BehaviorSubject(true);

  constructor() {
    this.checkInitialStatus();
    this.setupNetworkListener();
  }

  public get onlineStatus$() {
    return this.onlineStatus.asObservable();
  }

  private async checkInitialStatus() {
    const status: ConnectionStatus = await Network.getStatus();
    this.onlineStatus.next(status.connected);
  }

  private setupNetworkListener() {
    Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
      this.onlineStatus.next(status.connected);
      console.log('Network status changed:', status.connected ? 'Online' : 'Offline');
    });
  }
}