import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ollie',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      backgroundColor: '#ffe6f2', 
      launchShowDuration: 2000, 
      launchAutoHide: false,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  }
}

export default config;
