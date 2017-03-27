import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ModalController } from 'ionic-angular';
import { MemberDetailsPage } from '../member-details/member-details';
import { PopoverController } from 'ionic-angular';


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

    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public modalCtrl: ModalController, public popoverCtrl: PopoverController) {
  
	this.directoryList = af.database.list('/directory',{query: {orderByChild: 'name'}});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
  }

  viewDetails(member) {
      //let profileModal = this.modalCtrl.create(MemberDetailsPage, { member: member });
      //profileModal.present();
      let popover = this.popoverCtrl.create(MemberDetailsPage, { member: member }, { cssClass: 'contact-popover' });
      popover.present();
  }

}
