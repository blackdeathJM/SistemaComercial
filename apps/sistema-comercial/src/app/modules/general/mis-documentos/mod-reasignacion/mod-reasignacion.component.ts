import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {RegistrosComponent} from '@s-shared/registros/registros.component';

@Component({
  selector: 'app-mod-reasignacion',
  standalone: true,
    imports: [CommonModule, MatDialogModule, RegistrosComponent],
  templateUrl: './mod-reasignacion.component.html',
  styleUrls: ['./mod-reasignacion.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModReasignacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
