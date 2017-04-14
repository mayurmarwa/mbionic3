import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/*
  Generated class for the Prices page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-prices',
  templateUrl: 'prices.html'
})
export class PricesPage {
    public segment: any;
    public lmeRef: any;
    public mcxRef: any;
    public lmeList: any;
    public mcxList: any;
    public sub1: any;
    public sub2: any;

    

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
        this.segment = "mcx";


        
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PricesPage');
  }
  

  ionViewWillEnter() {
      console.log("prices will enter");

      this.sub1 = this.af.database.list('/prices/lme')
          .subscribe(data => {
              this.lmeList = [];
              data.forEach(obj => {
                  //console.log(obj.$key);
                  this.lmeList.push(obj);
              });
              //this.requests.unsubscribe();
              this.lmeList = Observable.of(this.lmeList);
              //console.log(this.lmeList);
          });


      this.sub2 = this.af.database.list('/prices/mcx')
          .subscribe(data => {
              this.mcxList = [];
              data.forEach(obj => {
                  //console.log(obj);
                  this.mcxList.push(obj);
              });
              //this.requests.unsubscribe();
              this.mcxList = Observable.of(this.mcxList);
              //console.log(this.mcxList);
          });
  }

  ionViewWillLeave() {
      //this.lme
      //this.
      //console.log("price will unload");
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
  }
}
