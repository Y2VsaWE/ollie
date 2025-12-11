import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NetworkService } from './services/network.service'; // <-- NEU
import { ToastController } from '@ionic/angular/standalone'; // <-- NEU

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent {

  constructor(
    private networkService: NetworkService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.networkService.onlineStatus$.subscribe(isConnected => {
      if (!isConnected) {
        this.showOfflineToast();
      } else {
        this.showOnlineToast(); 
      }
    });
  }

  async showOfflineToast() {
    const toast = await this.toastCtrl.create({
      message: 'You are currently **offline**. Some features may not be available.',
      duration: 5000,
      position: 'bottom',
      color: 'danger',
      icon: 'cloud-offline-outline'
    });
    toast.present();
  }

  async showOnlineToast() {
    const toast = await this.toastCtrl.create({
      message: 'You are back online.',
      duration: 5000,
      position: 'bottom',
      color: 'success',
      icon: 'cloud-online-outline'
    });
    toast.present();
  }

}
