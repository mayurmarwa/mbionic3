import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SignupPage,
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        CustomIconsModule

    ],
    exports: [
        SignupPage
    ]
})
export class SignupPageModule { }
