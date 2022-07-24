import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    imports:
        [
            MatFormFieldModule,
            MatButtonModule,
            MatIconModule
        ],
    exports:
        [
            MatFormFieldModule,
            MatButtonModule,
            MatIconModule
        ]
})
export class NgMaterialModule
{
}
