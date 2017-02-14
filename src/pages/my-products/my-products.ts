import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SelectCategoryPage } from '../select-category/select-category';

/*
  Generated class for the MyProducts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html'
})
export class MyProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProductsPage');
  }

  selectcat() {

      this.navCtrl.push(SelectCategoryPage);
  }

}
