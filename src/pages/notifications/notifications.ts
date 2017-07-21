import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
    public sub1: any;
    public userlist: any;
    public usercount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire) {
      this.sub1 = this.af.database.list('/notifications', {
            query: {
                orderByChild: 'createdAt'
                
            }
        })
            .subscribe(data => {
                this.userlist = [];
                data.forEach(obj => {
                    console.log(obj);
                   
                    this.usercount++;
                    this.userlist.push(obj);
                });
                //this.requests.unsubscribe();
                //console.log(Date.now());
                this.userlist = Observable.of(this.userlist.reverse());
                //console.log(this.lmeList);
            });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

    ionViewWillUnload(){
        this.sub1.unsubscribe();
    }
}
