var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { EmailValidator } from '../../validators/email';
/*
  Generated class for the Resetpassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var ResetpasswordPage = (function () {
    function ResetpasswordPage(authData, formBuilder, nav, alertCtrl) {
        this.authData = authData;
        this.formBuilder = formBuilder;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required,
                    EmailValidator.isValid])]
        });
    }
    /**
    * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
    */
    ResetpasswordPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    /**
    * If the form is valid it will call the AuthData service to reset the user's password displaying a loading
    * component while the user waits.
    *
    * If the form is invalid it will just log the form value, feel free to handle that as you like.
    */
    ResetpasswordPage.prototype.resetPassword = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.authData.resetPassword(this.resetPasswordForm.value.email)
                .then(function (user) {
                var alert = _this.alertCtrl.create({
                    message: "We just sent you a reset link to your email",
                    buttons: [{
                            text: "Ok", role: 'cancel',
                            handler: function () {
                                _this.nav.pop();
                            }
                        }]
                });
                alert.present();
            }, function (error) {
                var errorMessage = error.message;
                var errorAlert = _this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [{ text: "Ok", role: 'cancel' }]
                });
                errorAlert.present();
            });
        }
    };
    ResetpasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ResetpasswordPage');
    };
    ResetpasswordPage = __decorate([
        Component({
            selector: 'page-resetpassword',
            templateUrl: 'resetpassword.html'
        }), 
        __metadata('design:paramtypes', [AuthService, FormBuilder, NavController, AlertController])
    ], ResetpasswordPage);
    return ResetpasswordPage;
}());
//# sourceMappingURL=resetpassword.js.map