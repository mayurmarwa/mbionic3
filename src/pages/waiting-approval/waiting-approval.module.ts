import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitingApproval } from './waiting-approval';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        WaitingApproval,
    ],
    imports: [
        IonicPageModule.forChild(WaitingApproval),
        CustomIconsModule

    ],
    exports: [
        WaitingApproval
    ]
})
export class WaitingApprovalModule { }
