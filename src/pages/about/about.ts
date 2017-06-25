import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
    public about: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
        this.about = af.database.object('/about');
        
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

    openPrivacy(){
        this.navCtrl.push('PrivacyPolicyPage');
    }
 
}
