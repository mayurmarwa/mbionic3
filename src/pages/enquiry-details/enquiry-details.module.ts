import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnquiryDetailsPage } from './enquiry-details';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        EnquiryDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(EnquiryDetailsPage),
        CustomIconsModule

    ],
    exports: [
        EnquiryDetailsPage
    ]
})
export class EnquiryDetailsPageModule { }
