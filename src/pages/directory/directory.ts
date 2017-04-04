import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { MemberDetailsPage } from '../member-details/member-details';
import { PopoverController } from 'ionic-angular';
import firebase from 'firebase';

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
	
    loadedlist: any;
    directory: any;
    directoryRef: any;


    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public popoverCtrl: PopoverController,public loadingCtrl: LoadingController) {
  
        let loadingPopup = this.loadingCtrl.create({
            content: 'Loading...'
        });
        loadingPopup.present();
        this.directoryRef = firebase.database().ref('/directory');

    this.directoryRef.on('value', memberList => {
        let members = [];
        memberList.forEach(country => {
            members.push(country.val());
        });

        this.directory = members;
        this.loadedlist = members;
        loadingPopup.dismiss();
    });
    
    }

    initializeItems(): void {
        this.directory = this.loadedlist;
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryPage');
    }
  getItems(searchbar) {
      // Reset items back to all of the items
      this.initializeItems();

      // set q to the value of the searchbar
      var q = searchbar.srcElement.value;


      // if the value is an empty string don't filter the items
      if (!q) {
          return;
      }

      this.directory = this.directory.filter((v) => {
          if (v.Name && q) {
              if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                  return true;
              }
              return false;
          }
      });

      console.log(q, this.directory.length);

  }

  viewDetails(member) {
      //let profileModal = this.modalCtrl.create(MemberDetailsPage, { member: member });
      //profileModal.present();
      let popover = this.popoverCtrl.create(MemberDetailsPage, { member: member }, { cssClass: 'contact-popover' });
      popover.present();
  }

}
