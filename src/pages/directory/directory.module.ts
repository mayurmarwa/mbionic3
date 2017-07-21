import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectoryPage } from './directory';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        DirectoryPage,
    ],
    imports: [
        IonicPageModule.forChild(DirectoryPage),
        CustomIconsModule

    ],
    exports: [
        DirectoryPage
    ]
})
export class DirectoryPageModule { }
