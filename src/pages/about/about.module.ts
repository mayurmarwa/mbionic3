import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { CustomIconsModule } from 'ionic2-custom-icons';

@NgModule({
    declarations: [
        AboutPage,
    ],
    imports: [
        IonicPageModule.forChild(AboutPage),
        CustomIconsModule

    ],
    exports: [
        AboutPage
    ]
})
export class AboutPageModule { }
