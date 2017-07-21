import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProfilePage } from './my-profile';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        MyProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(MyProfilePage),
        CustomIconsModule

    ],
    exports: [
        MyProfilePage
    ]
})
export class MyProfilePageModule { }
