import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the FilterOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filter-options',
  templateUrl: 'filter-options.html'
})
export class FilterOptionsPage {

    public weight: any;
    public weightval: any;
    public length: any;
    public width: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterOptionsPage');
  }

  filterdismiss() {

      this.viewCtrl.dismiss(false); //Send back the form object when closeModal is called
  }
  applyFilter() {

      this.viewCtrl.dismiss(true,this.weight); //Send back the form object when closeModal is called
  }

  consolelog() {

      console.log(this.weight);
      console.log(this.weightval);
  }
}
