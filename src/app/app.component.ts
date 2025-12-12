import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NetworkService } from './services/network.service';
import { ToastController, Platform } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudOfflineOutline, cloudDoneOutline } from 'ionicons/icons';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonRouterOutlet, IonApp],
})
export class AppComponent {

  constructor(
    private networkService: NetworkService,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {
    addIcons({cloudOfflineOutline, cloudDoneOutline});
    this.initializeApp();
  }

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
      position: 'top',
      color: 'danger',
      icon: 'cloud-offline-outline'
    });
    toast.present();
  }

  async showOnlineToast() {
    const toast = await this.toastCtrl.create({
      message: 'You are back online.',
      duration: 1000,
      position: 'top',
      color: 'success',
      icon: 'cloud-done-outline'
    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      if (this.platform.is('capacitor')) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        await SplashScreen.hide({
          fadeOutDuration: 300,
        });
      }
    });
  }


}
