import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProfilePage } from './create-profile';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        CreateProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(CreateProfilePage),
        CustomIconsModule

    ],
    exports: [
        CreateProfilePage
    ]
})
export class CreateProfilePageModule { }
