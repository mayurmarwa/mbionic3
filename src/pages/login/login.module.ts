import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [
        IonicPageModule.forChild(LoginPage),
        CustomIconsModule

    ],
    exports: [
        LoginPage
    ]
})
export class LoginPageModule { }
