import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CommfuncService } from '../service/commfunc.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  newsCat = null;
  public jsonItems: any;
  public domainURL: String = '';
  private intLastNewsID: number;
  public listOfNewsInfinite: any;
  public strNewsCatName :string='';
  constructor(
        private activatedRoute: ActivatedRoute,
        public http: HttpClient,
        public loadingCtrl: LoadingController,
        public myFunc: CommfuncService,
        private mySocialShare: SocialSharing
    ) {
  }

  ngOnInit() {
     this.domainURL = this.myFunc.domainURL;
     this.newsCat = this.activatedRoute.snapshot.paramMap.get('newsCat');
     this.strNewsCatName = this.myFunc.sectionName(this.newsCat);
     // alert(this.newsCat);
     this.getNewsDataByNewsCat();
  }

  async  getNewsDataByNewsCat() {
    let data: any;
    const url = this.domainURL + 'handlers/getNewsByCat.ashx?newsCategory=' + this.newsCat;
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
    });
    data = this.http.get(url);
    loading.present().then(() => {
      data.subscribe(result => {
        console.log(result);
        this.jsonItems = result;
        const dataLength = this.jsonItems.length;
        this.intLastNewsID = this.jsonItems[dataLength - 1].newsID;
        console.log('Last News ID : ' + this.intLastNewsID);
        loading.dismiss();
      });
      return loading.present();
    }, error => {
        loading.dismiss();
    });
  }

  doInfinite(event) {
    setTimeout(() => {
      const infiniteURL = this.myFunc.domainURL + 'handlers/getNewsByCat.ashx?lastNewsID=' + this.intLastNewsID + '&newsCategory=' + this.newsCat;
      const infinteData = this.http.get(infiniteURL);
      infinteData.subscribe(result => {
        console.log(result);
        this.listOfNewsInfinite = result;
        const newData = this.listOfNewsInfinite;
        this.intLastNewsID = this.listOfNewsInfinite[newData.length - 1].newsID;
        for (let i = 0; i < newData.length; i++) {
          this.jsonItems.push(newData[i]);
        }
        event.target.complete();
      });
    }, 500);
  }

  shareNews(newsID, newsTitle) {
    let shareLink = '';
    shareLink = this.myFunc.domainURL + 'newsDisplay.aspx?newsID=' + newsID;
    this.mySocialShare.share(newsTitle, null, null, shareLink).then(() => {
      console.log('success');
    }).catch((error) => {
      console.log(error);
      console.log('error');
    });
  }

}
