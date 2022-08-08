import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {STATE_DEPTOS} from '@s-app/modules/admin/deptos/deptos.state';
import {IDepto} from '../../../../../../../../../libs/models';


@Component({
    selector: 'app-lista-deptos',
    templateUrl: './lista-deptos.component.html',
    styleUrls: ['./lista-deptos.component.scss']
})
export class ListaDeptosComponent implements AfterContentChecked, OnInit
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

    ngOnInit(): void
    {
        // this.deptos = STATE_DEPTOS();
    }
}
