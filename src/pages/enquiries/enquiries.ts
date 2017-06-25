import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, Content } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { EnquiryDetailsPage } from '../enquiry-details/enquiry-details';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

/*
  Generated class for the Enquiries page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-enquiries',
  templateUrl: 'enquiries.html'
})
export class EnquiriesPage {
        
    @ViewChild(Content) content: Content;

    messagesList: any;
    chatBox: any;
    otherUserList: any;
    messagesListRef: any;
    public initialLoad: boolean = false;
    messageobject: FirebaseObjectObservable<any>;
    enqobject: FirebaseObjectObservable<any>;
	public enquiryList: any;	
    public enquiryListref: any;	
    public sentList: any;
    public sentListref: any;	
    public currentuser: any;
    public currentuserid: any;
    public userProfile: FirebaseObjectObservable<any>;
    public user:any;
    public segment: any;
    public enqListRev: Observable<any>;
    public sentListRev: Observable<any>;
    public loadingPopup: any;
    public loadingPopup2: any;
    public keys: any;
    public keys2: any;
    public sub1: any;
    public sub2: any;
    public flag: any;
    public supcount: any;



    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public storage: Storage, public loadingCtrl: LoadingController) {
      
       
       
        //storage.ready().then(() => {
          //storage.get('currentuser').then((val) => {
        

        this.currentuser = firebase.auth().currentUser;
        
        this.messagesList = af.database.list('/users/' + this.currentuser.uid + '/support/');
        //this.messagesListRef = firebase.database().ref('/users/' + this.currentuser.uid + '/support/');
        this.messageobject = this.af.database.object('/users/' + this.currentuser.uid + '/support/');
        this.enqobject = this.af.database.object('/users/' + this.currentuser.uid + '/enquiries/');

        this.otherUserList = af.database.list('/support/' + this.currentuser.uid + '/messgaes/');
        this.userProfile = af.database.object('/users/' +this.currentuser.uid, { preserveSnapshot: true });
            this.userProfile.first().subscribe(snapshot => {
            //console.log(snapshot.key)
            //console.log(snapshot.val())
                this.user = snapshot.val();
        });
        
              //this.currentuserid = this.currentuser.uid;
        this.segment = "received";
        //setTimeout(() => {
            this.setData();
        //},3000);
              
      


              //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');

          //})
            //  .catch((err) =>
              //    console.log(err));
      //}).catch((err) =>
        //  console.log(err));     
       
  }
  
    ionViewWillUnload(){
    
        console.log("unload");
        this.messagesList.$ref.off();
        this.otherUserList.$ref.off();
    }
    

  ionViewDidLoad() {
      console.log('ionViewDidLoad EnquiriesPage');
      this.segment = "received";
      
      this.af.database.object('/users/' + this.currentuser.uid + '/enquiries/').update(
                          {
                              //name: this.user.name,
                              unreadrcv: false,
                              //count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
       
     let loading = this.loadingCtrl.create({
          content: 'Updating...'
      });
     loading.present();

     setTimeout(() => {
         loading.dismiss();
     }, 1500);
      
       this.messagesList.$ref.on('child_added', (message) => {
                if (!this.initialLoad ) return;
                console.log(message.val());
        if(this.segment === 'support' && this.navCtrl.getActive().name === 'EnquiriesPage'){
                     this.supcount = 0;

        this.af.database.object('/users/' + this.currentuser.uid + '/support/').update(
                          {
                              //name: this.user.name,
                              unread: false,
                              count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
        setTimeout(()=>{this.content.scrollToBottom();},100); 
    
                }  
            else {
            this.supcount = this.supcount + 1
        }
        
         });
        this.messagesList.$ref.once('value', (messages) => {
            console.log(messages.val().count);
                this.supcount = messages.val().count;
                this.initialLoad = true;    
        });
       
    
    }

    


  setData() {

      this.enquiryListref = firebase.database().ref('/users/' + this.currentuser.uid + '/enquiries').orderByChild("type").equalTo("received");
      //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
      //   query: {
      //       orderByChild: "type",
      //       equalTo: this.segment
      //   }
      //});
      this.enquiryListref.on('value', snapshot => {

          //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
          //query: {
          //    orderByChild: "type",
          //    equalTo: this.segment
          // }
          //});
          //console.log("received");
          //this.enqListRev = [];

          this.enquiryList = [];
          this.keys = [];
          snapshot.forEach(country => {

              this.enquiryList.push(country.val());
              this.keys.push(country.key);

          });
          for (var i in this.enquiryList) {
              this.enquiryList[i].key = this.keys[i];

          }

          //this.enqListRev = this.enquiryList.reverse();

          this.enqListRev = Observable.of(this.enquiryList.reverse());
          console.log(this.enqListRev);

          this.flag = true;
      });

      this.sentListref = firebase.database().ref('/users/' + this.currentuser.uid + '/enquiries').orderByChild("type").equalTo("sent");
      //this.enquiryList = this.af.database.list('/users/' + this.currentuserid + '/enquiries', {
      //   query: {
      //       orderByChild: "type",
      //       equalTo: this.segment
      //   }
      //});
      this.sentListref.on('value', snapshot => {

          //this.sentListRev = [];
          this.sentList = [];
          this.keys2 = [];
          snapshot.forEach(country => {
              //console.log(country.key);
              this.sentList.push(country.val());
              this.keys2.push(country.key);
          });

          for (var i in this.sentList) {
              this.sentList[i].key = this.keys2[i];

          }
          //this.updateEnquiryList(2);
          this.sentListRev = Observable.of(this.sentList.reverse());
      });


  }


  


  ionViewDidEnter() {
      
  }

  openenquirypage(enquiry){

      firebase.database().ref('/users/' + this.currentuser.uid + '/enquiries/' + enquiry.key).update({unread: false});
		this.navCtrl.push(EnquiryDetailsPage, {enquiry: enquiry});  
  }

  updateEnquiryList(type) {

      if (type == 1) {

          this.enqListRev = this.enquiryList.reverse();

          this.enqListRev = Observable.of(this.enqListRev);
      }
      else if (type == 2) {

          this.sentListRev = this.sentList.reverse();
          this.sentListRev = Observable.of(this.sentList.reverse());

      }
     
      
          
     
      
      
  }

    send(chatBox){

        

        //console.log(this.user);
        this.af.database.object('support/' + this.currentuser.uid).update(
                          {
                              name: this.user.name,
                              unread: true,
                              timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
      //console.log(this.enquiry.key);
      //console.log(this.enquiry);
			//console.log(chatBox);
			this.messagesList.push({
									
				text: this.chatBox,
				type: 'sent'
			});
			this.otherUserList.push({
									
				text: this.chatBox,
				type: 'received'
			});
			this.chatBox = '';

  }

    segmentChanged()
    {
    if(this.segment === 'support'){
        this.supcount = 0;

        this.af.database.object('/users/' + this.currentuser.uid + '/support/').update(
                          {
                              //name: this.user.name,
                              unread: false,
                              count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
         
        setTimeout(()=>{this.content.scrollToBottom();},200); 
    
    }
     else if(this.segment === 'received'){

        this.af.database.object('/users/' + this.currentuser.uid + '/enquiries/').update(
                          {
                              //name: this.user.name,
                              unreadrcv: false,
                              //count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
         
    
    }
        else if(this.segment === 'sent'){

        this.af.database.object('/users/' + this.currentuser.uid + '/enquiries/').update(
                          {
                              //name: this.user.name,
                              unreadsent: false,
                              //count: 0
                              //timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              //productImage: this.productImageURL
                          });
         
    
    }
    
    }
}
