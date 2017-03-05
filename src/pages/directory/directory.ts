import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


/*
  Generated class for the Directory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-directory',
  templateUrl: 'directory.html'
})
export class DirectoryPage {
	
	directoryList: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
  
	this.directoryList = af.database.list('/directory',{query: {orderByChild: 'name'}});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
  }

}
