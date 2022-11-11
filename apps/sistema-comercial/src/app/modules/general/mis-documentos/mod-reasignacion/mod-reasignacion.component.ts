import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mod-reasignacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mod-reasignacion.component.html',
  styleUrls: ['./mod-reasignacion.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModReasignacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
