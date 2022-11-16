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
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatLuxonDateModule} from '@angular/material-luxon-adapter';


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
            MatTooltipModule,
            MatButtonToggleModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatMomentDateModule,
            MatLuxonDateModule,
            MatCheckboxModule,
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
            PortalModule,
            MatTooltipModule,
            MatButtonToggleModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatMomentDateModule,
            MatLuxonDateModule,
            MatCheckboxModule
        ],
    providers: [{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}]
})
export class NgMaterialMaterialModule
{
}
