import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Karvalli',
      url: '/list',
      icon: 'paper',
      newsCat : 'karvalli'
    },
     {
      title: 'State / National',
      url: '/list',
      icon: 'globe',
      newsCat: 'national'
    },
    {
      title: 'International',
      url: '/list',
      icon: 'planet',
      newsCat: 'international'
    },
    {
      title: 'Sports',
      url: '/list',
      icon: 'football',
      newsCat: 'sports'
    },
    {
      title: 'Enterainment',
      url: '/list',
      icon: 'desktop',
      newsCat: 'entertainment'
    },
    {
      title: 'Upcoming Programs',
      url: '/upcoming',
      icon: 'trending-up',
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
