import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FuseAlertModule} from "@s-fuse/alert";

@Component({
  selector: 'app-lista-sum-pbr',
  standalone: true,
    imports: [CommonModule, FuseAlertModule],
  templateUrl: './lista-sum-pbr.component.html',
  styleUrls: ['./lista-sum-pbr.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaSumPbrComponent {

}
