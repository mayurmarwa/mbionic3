import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnquirySentPage } from './enquiry-sent';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        EnquirySentPage,
    ],
    imports: [
        IonicPageModule.forChild(EnquirySentPage),
        CustomIconsModule

    ],
    exports: [
        EnquirySentPage
    ]
})
export class EnquirySentPageModule { }
