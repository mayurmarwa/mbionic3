import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BrowseRequirementsPage } from './browse-requirements';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        BrowseRequirementsPage,
    ],
    imports: [
        IonicPageModule.forChild(BrowseRequirementsPage),
        CustomIconsModule

    ],
    exports: [
        BrowseRequirementsPage
    ]
})
export class BrowseRequirementsPageModule { }
