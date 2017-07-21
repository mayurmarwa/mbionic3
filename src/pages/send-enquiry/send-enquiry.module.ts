import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendEnquiryPage } from './send-enquiry';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SendEnquiryPage,
    ],
    imports: [
        IonicPageModule.forChild(SendEnquiryPage),
        CustomIconsModule

    ],
    exports: [
        SendEnquiryPage
    ]
})
export class SendEnquiryPageModule { }
