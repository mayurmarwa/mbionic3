import { Component } from '@angular/core';
import { Platform, AlertController} from 'ionic-angular'
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';




@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tab5Root: any;
  public alert: any;

      public msgbadge: any;
      public currentuser: any;
      enqobject: any;
      msgobject: any;


  constructor(public platform: Platform, public alertCtrl: AlertController, public af: AngularFire) {
    //this.tab1Root = TabChatsPage;
    //this.tab2Root = TabContactsPage;
    //this.tab3Root = TabProfilePage;
              this.currentuser = firebase.auth().currentUser;
      this.msgbadge = '';

      this.tab1Root = 'MarketPage';
      this.tab2Root = 'PricesPage';
      this.tab3Root = 'SpeedDialPage';
      this.tab4Root = 'EnquiriesPage';
      this.tab5Root = 'MetalCalculatorPage';

        this.enqobject = this.af.database.object('/users/' + this.currentuser.uid + '/enquiries/').subscribe(snapshot => {
            //console.log(snapshot.key)
            console.log(snapshot)
          if(snapshot.unreadrcv || snapshot.unreadsent ){
            this.msgbadge = "!";
          }
            else{
            this.msgbadge = "";
          }
       });

       this.msgobject = this.af.database.object('/users/' + this.currentuser.uid + '/support/').subscribe(snapshot => {
            //console.log(snapshot.key)
            console.log(snapshot)
          if(snapshot.unread ){
            this.msgbadge = "!";
          }
           else{
            this.msgbadge = "";
          }
       });
      
}

    ionViewWillUnload(){
        console.log("tabs unload");
        this.enqobject.unsubscribe();
        this.msgobject.unsubscribe();
    }
    
}