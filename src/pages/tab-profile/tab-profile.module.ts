import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabProfilePage } from './tab-profile';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        TabProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(TabProfilePage),
        CustomIconsModule

    ],
    exports: [
        TabProfilePage
    ]
})
export class TabProfilePageModule { }
