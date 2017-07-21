import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequirementDetailsPage } from './requirement-details';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        RequirementDetailsPage,
    ],
    imports: [
        IonicPageModule.forChild(RequirementDetailsPage),
        CustomIconsModule

    ],
    exports: [
        RequirementDetailsPage
    ]
})
export class RequirementDetailsPageModule { }
