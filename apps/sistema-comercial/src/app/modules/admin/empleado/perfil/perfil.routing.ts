import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

const perfilRouting: Route[] =
    [];

@NgModule({
    imports: [RouterModule.forChild(perfilRouting)],
    exports: [RouterModule]
})
export class PerfilRouting
{
}
