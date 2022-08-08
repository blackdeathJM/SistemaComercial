import {AfterContentChecked, Component} from '@angular/core';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';
import {IDepto} from '#/libs/models/src';

@Component({
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss']
})
export class ListaDeptosComponent implements AfterContentChecked
{
    deptos = STATE_DEPTOS();

    ngAfterContentChecked(): void
    {
        this.deptos = STATE_DEPTOS();
    }

    trackByFn(index: number, item: IDepto): string
    {
        return item._id;
    }
}
