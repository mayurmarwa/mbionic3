import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsPage } from './notifications';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        NotificationsPage,
    ],
    imports: [
        IonicPageModule.forChild(NotificationsPage),
        CustomIconsModule

    ],
    exports: [
        NotificationsPage
    ]
})
export class NotificationsPageModule { }
