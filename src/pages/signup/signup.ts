import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { VerifyMobilePage } from '../verify-mobile/verify-mobile';
import { EmailValidator } from '../../validators/email';


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    public signupForm;
    emailChanged: boolean = false;
    passwordChanged: boolean = false;
    submitAttempt: boolean = false;
	loading;

    constructor(public nav: NavController,
        public formBuilder: FormBuilder,
        public toastCtrl: ToastController) {

        this.signupForm = formBuilder.group({
            name: ['', Validators.required],
            mobile: ['', Validators.compose([Validators.minLength(10),Validators.required,Validators.maxLength(10)])],
            companyname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required,
            EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6),
                Validators.required])],
            
        });
    }

    /**
    * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
    */
    elementChanged(input) {
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
    }

    /**
    * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
    * component while the user waits.
    * this.navCtrl.push(AddProductPage, { category: category });
    * If the form is invalid it will just log the form value, feel free to handle that as you like.
    */
    signupUser() {
        this.submitAttempt = true;

        if (!this.signupForm.valid) {
            let toast = this.toastCtrl.create({
                message: 'Invalid Entries',
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        } else {
            this.nav.push(VerifyMobilePage, { form: this.signupForm, type: "email" });
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

}
