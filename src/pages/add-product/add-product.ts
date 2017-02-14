import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AddProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html'
})
export class AddProductPage {
    public catid: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.catid = navParams.get("catid");
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

}
