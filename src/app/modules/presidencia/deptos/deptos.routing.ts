import {RouterModule, Routes} from '@angular/router';
import {DeptosPrincipalComponent} from '@app/modules/presidencia/deptos/deptos-principal/deptos-principal.component';
import {NgModule} from '@angular/core';

const DEPTOS_ROUTING: Routes =
    [
        {
            path: 'deptos',
            component: DeptosPrincipalComponent
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(DEPTOS_ROUTING)],
    exports: [RouterModule]
})
export class DeptosRouting
{
}
