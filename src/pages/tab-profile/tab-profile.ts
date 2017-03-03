import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { ProfileData } from '../../providers/profile-data';
import firebase from 'firebase';


@Component({
  selector: 'page-tab-profile',
  templateUrl: 'tab-profile.html'
})
export class TabProfilePage {
  user: {displayName?: string, email?: string, photoURL?: string} = {};
  public userProfile: any;
  public currentuser: any;

  constructor(
    public authService: AuthService,
    public loadingCtrl: LoadingController,
    public profileData: ProfileData,
    public alertCtrl: AlertController
  ) {
      this.user.photoURL = 'assets/img/noimage.png';
      this.profileData = profileData;
      this.currentuser = firebase.auth().currentUser;

      this.authService.getFullProfile(this.currentuser.uid)
          .subscribe(user => {
              //loading.dismiss();
             // this.user.displayName = user.displayName;
              //this.user.email = user.email || user.providerData[0].email || 'Not set yet.';
              //this.user.photoURL = user.photoURL || this.user.photoURL;
              this.userProfile = user;
          }, (error) => {
              //loading.dismiss();
              console.log('Error: ' + JSON.stringify(error));
          });
     /** this.profileData.getUserProfile().on('value', (data) => {
          this.userProfile = data.val();
          alert(this.userProfile);
          //this.birthDate = this.userProfile.birthDate;
      });**/
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.currentUser
      .subscribe(user => {
        loading.dismiss();
        this.user.displayName  = user.displayName;
        this.user.email        = user.email || user.providerData[0].email || 'Not set yet.';
        this.user.photoURL     = user.photoURL || this.user.photoURL;
      }, (error)=> {
        loading.dismiss();
        console.log('Error: ' + JSON.stringify(error));
        });
    console.log(this.userProfile);
  }

  updateName() {
      let alert = this.alertCtrl.create({
          message: "Your name",
          inputs: [
              {
                  name: 'name',
                  placeholder: 'Your name',
                  value: this.userProfile.name
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updateName(data.name);
                  }
              }
          ]
      });
      alert.present();
  }

  updateMobile() {
      let alert = this.alertCtrl.create({
          message: "Mobile No. (+91)",
          inputs: [
              {
                  name: 'mobile',
                  placeholder: 'Mobile No.',
                  value: this.userProfile.mobile
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updateMobile(data.mobile);
                  }
              }
          ]
      });
      alert.present();
  }
  updateAddress() {
      let alert = this.alertCtrl.create({
          message: "Company Address",
          inputs: [
              {
                  name: 'address',
                  placeholder: 'Address',
                  value: this.userProfile.address
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updateAddress(data.address);
                  }
              }
          ]
      });
      alert.present();
  }


  updateCompanyName() {
      let alert = this.alertCtrl.create({
          message: "Your Company Name",
          inputs: [
              {
                  name: 'companyname',
                  placeholder: 'Your Company Name',
                  value: this.userProfile.companyname
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updateCompanyName(data.companyname);
                  }
              }
          ]
      });
      alert.present();
  }

  updateCompanyProfile() {
      let alert = this.alertCtrl.create({
          message: "Company Profile",
          inputs: [
              {
                  name: 'companyprofile',
                  placeholder: 'Company Profile',
                  value: this.userProfile.companyprofile
              },
              /**{
                  name: 'lastName',
                  placeholder: 'Your last name',
                  value: this.userProfile.lastName
              },**/
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updateCompanyProfile(data.companyprofile);
                  }
              }
          ]
      });
      alert.present();
  }




  updateEmail() {
      let alert = this.alertCtrl.create({
          inputs: [
              {
                  name: 'newEmail',
                  placeholder: 'Your new email',
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updateEmail(data.newEmail);
                  }
              }
          ]
      });
      alert.present();
  }

  updatePassword() {
      let alert = this.alertCtrl.create({
          inputs: [
              {
                  name: 'newPassword',
                  placeholder: 'Your new password',
                  type: 'password'
              },
          ],
          buttons: [
              {
                  text: 'Cancel',
              },
              {
                  text: 'Save',
                  handler: data => {
                      this.profileData.updatePassword(data.newPassword);
                  }
              }
          ]
      });
      alert.present();
  }

}
