import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.ollie',
  appName: 'Ollie Book Tracker',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      backgroundColor: '#ffe6f2', 
      launchShowDuration: 2000, 
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  }
}

export default config;
