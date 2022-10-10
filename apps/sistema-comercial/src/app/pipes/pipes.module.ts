import {NgModule} from '@angular/core';
import {ConvertirTimestamUnixPipe} from './convertir-timestam-unix.pipe';


@NgModule({
    declarations:
        [
            ConvertirTimestamUnixPipe,
        ],
    exports: [ConvertirTimestamUnixPipe]
})
export class PipesModule
{
}
