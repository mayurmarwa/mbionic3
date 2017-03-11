import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.segment = "mcx";
        this.updatePriceList();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricesPage');
  }
  updatePriceList() {
      console.log(this.segment);
  }

}
