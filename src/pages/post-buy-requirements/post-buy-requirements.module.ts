import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostBuyRequirementsPage } from './post-buy-requirements';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        PostBuyRequirementsPage,
    ],
    imports: [
        IonicPageModule.forChild(PostBuyRequirementsPage),
        CustomIconsModule

    ],
    exports: [
        PostBuyRequirementsPage
    ]
})
export class PostBuyRequirementsPageModule { }
