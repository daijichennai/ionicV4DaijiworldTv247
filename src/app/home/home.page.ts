import { Component, OnInit} from '@angular/core';
import { LoadingController ,ToastController  } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CommfuncService } from '../service/commfunc.service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public jsonItems: any;
  public domainURL: String = '';
  public featuredItems: any;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public myFunc: CommfuncService,
    private iab: InAppBrowser,
    private so: ScreenOrientation,
    private network: Network,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.domainURL = this.myFunc.domainURL;

    // watch network for a disconnection
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.presentToast('Network was disconnected :-(');
    });

    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      this.getNewsData();
      this.getFeaturedNews();
      this.presentToast('Network connected!');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.presentToast('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    this.getNewsData();
    this.getFeaturedNews();
  }

  async  getNewsData() {
    let data: any;
    const url = this.domainURL + 'handlers/homePage.ashx';
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.jsonItems = result;
        loading.dismiss();
      });
      return loading.present();
      setTimeout(() => {
        loading.dismiss();
      }, 5000);
    }, error => {
        loading.dismiss();
    });
  }

  async  getFeaturedNews() {
    let data: any;
    const url = this.domainURL + 'handlers/featuredNews.ashx';
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.featuredItems = result;
        loading.dismiss();
      });
      return loading.present();
    }, error => {
      loading.dismiss();
    });
  }


  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  playVideo() {
      let data: Observable<any>;
      let url = this.myFunc.domainURL + 'handlers/daijiLive.ashx?mode=list';
      const options: InAppBrowserOptions = {
        toolbar: 'no',
        location: 'no',
        zoom: 'no',
        fullscreen: 'yes',
      };
      data = this.http.get(url);
      data.subscribe(result => {
        this.lockLandscape();
        const browser =   this.iab.create(result[0].hpVideoCode, '_blank', options);
        browser.on('exit').subscribe(event => {
          this.lockPortrait();
        });
      });
    }

  lockPortrait() {
    this.so.lock(this.so.ORIENTATIONS.PORTRAIT);
  }

  lockLandscape() {
    this.so.lock('landscape');
  }

}
