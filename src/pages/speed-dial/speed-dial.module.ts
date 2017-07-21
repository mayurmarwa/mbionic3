import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeedDialPage } from './speed-dial';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        SpeedDialPage,
    ],
    imports: [
        IonicPageModule.forChild(SpeedDialPage),
        CustomIconsModule

    ],
    exports: [
        SpeedDialPage
    ]
})
export class SpeedDialPageModule { }
