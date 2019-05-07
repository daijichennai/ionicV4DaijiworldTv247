import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CommfuncService } from '../service/commfunc.service';
import { Observable } from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-newsdisplay',
  templateUrl: './newsdisplay.page.html',
  styleUrls: ['./newsdisplay.page.scss'],
})
export class NewsdisplayPage implements OnInit {
  newsID = null;
  public singleJson: any;
  public domainURL: string = '';
  public strNewsTitle: string;
  constructor(private activatedRoute: ActivatedRoute,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public myFunc: CommfuncService,
              private mySocialShare: SocialSharing
    ) { }
  ngOnInit() {
    this.newsID = this.activatedRoute.snapshot.paramMap.get('newsID');
    this.getDataByID(this.newsID);
  }

  async getDataByID(newsID: number) {
    let data: Observable<any>;
    let url = this.myFunc.domainURL + 'handlers/newsMaster.ashx?newsID=' + newsID + '&newsMode=displayNews';
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });

    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        // console.log(result[0].newsTitle);
        this.singleJson = result;
        this.strNewsTitle = result[0].newsTitle;
        loading.dismiss();
      });
      return loading.present();
    }, error => {
      loading.dismiss();
    });
  }

  shareNews() {
    let shareLink = '';
    shareLink = this.myFunc.domainURL + 'newsDisplay.aspx?newsID=' + this.newsID;
    this.mySocialShare.share(this.strNewsTitle, null, null, shareLink).then(() => {
      console.log('success');
    }).catch((error) => {
      console.log(error);
      console.log('error');
    });
  }
}
