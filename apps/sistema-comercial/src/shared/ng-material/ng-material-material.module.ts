import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {PortalModule} from '@angular/cdk/portal';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
    imports:
        [
            MatFormFieldModule,
            MatButtonModule,
            MatIconModule,
            MatExpansionModule,
            MatProgressSpinnerModule,
            MatInputModule,
            MatDialogModule,
            MatDividerModule,
            CdkScrollableModule,
            MatSidenavModule,
            PortalModule,
        ],
    exports:
        [
            MatFormFieldModule,
            MatButtonModule,
            MatIconModule,
            MatExpansionModule,
            MatProgressSpinnerModule,
            MatInputModule,
            MatDialogModule,
            MatDividerModule,
            CdkScrollableModule,
            MatSidenavModule,
            PortalModule
        ]
})
export class NgMaterialMaterialModule
{
}
