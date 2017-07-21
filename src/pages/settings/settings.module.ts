import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SettingsPage,
    ],
    imports: [
        IonicPageModule.forChild(SettingsPage),
        CustomIconsModule

    ],
    exports: [
        SettingsPage
    ]
})
export class SettingsPageModule { }
