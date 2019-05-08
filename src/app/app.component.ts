import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Firebase } from '@ionic-native/firebase/ngx';
import { CommfuncService } from './service/commfunc.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public domainName;
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
    private statusBar: StatusBar,
    // public fireBase: Firebase,
    public myFunc: CommfuncService,
    public http: HttpClient,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.domainName = this.myFunc.domainURL;
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.fireBase.getToken().then(token => {
      //   // alert('Token ID = ' + token);;
      //   this.pushDeviceID(token);
      //   window.localStorage.setItem('token', token);
      // }, err => {
      //    alert('token Error = ' + err);
      // });

      // this.fireBase.onNotificationOpen().subscribe(data => {
      //   this.pushNotificationRedirect();
      // }, err => console.log(err));

    });
  }

  pushNotificationRedirect() {
    // this.nav.setRoot(HomePage);
    this.router.navigate(['/home']);
  }

  pushDeviceID(tokenID) {
    const insTokenURL = this.domainName + 'handlers/addAndroidDeviceID.ashx?deviceMode=insert&deviceID=' + tokenID;
    this.http.post(insTokenURL,'').subscribe(
      data => {
        if (data[0].status === 'success') {
          // alert(data[0].status);
        }
          // console.log(data[0].status);
      },
      error => {
         alert('Error = ' + error);
        // console.log(error);
      });
  }

}
