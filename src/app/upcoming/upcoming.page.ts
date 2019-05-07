import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CommfuncService } from '../service/commfunc.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  public domainName: string = '';
  public listOfUpcomingPro: any;
  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              public myFunc: CommfuncService
    ) { }

  ngOnInit() {
    this.getUpcomingProData();
  }

  async getUpcomingProData() {
    let data: Observable<any>;
    const url = this.myFunc.domainURL + 'handlers/upcomingPrograms.ashx';
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        this.listOfUpcomingPro = result;
        loading.dismiss();
      });
      return loading.present();
    }, error => {
      loading.dismiss();
    });
  }

}
