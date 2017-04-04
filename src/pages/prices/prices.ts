import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

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
    public lmeList: any;
    public mcxList: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
        this.segment = "mcx";
        this.lmeList = this.af.database.list('/prices/lme');
        this.mcxList = this.af.database.list('/prices/mcx');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricesPage');
  }
  updatePriceList() {
      console.log(this.segment);
  }

}
