import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MemberDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-member-details',
  templateUrl: 'member-details.html'
})
export class MemberDetailsPage {

    public member: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log(navParams.get('member'));
        this.member = navParams.get('member');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberDetailsPage');
  }

}
