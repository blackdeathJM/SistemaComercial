import {ChangeDetectionStrategy, Component} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-mod-comp-periodo-anterior',
    standalone: true,
    imports: [CommonModule],
    templateUrl: 'mod-comp-periodo-anterior.html',
    styleUrls: ['mod-comp-periodo-anterior.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModCompPeriodoAnterior
{

}
