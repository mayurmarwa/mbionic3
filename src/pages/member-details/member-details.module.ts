import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberDetailsPage } from './member-details';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        MemberDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(MemberDetailsPage),
        CustomIconsModule

    ],
    exports: [
        MemberDetailsPage
    ]
})
export class MemberDetailsPageModule { }
