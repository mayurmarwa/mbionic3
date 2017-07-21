import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterOptionsPage } from './filter-options';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        FilterOptionsPage,
    ],
    imports: [
        IonicPageModule.forChild(FilterOptionsPage),
        CustomIconsModule

    ],
    exports: [
        FilterOptionsPage
    ]
})
export class FilterOptionsPageModule { }
