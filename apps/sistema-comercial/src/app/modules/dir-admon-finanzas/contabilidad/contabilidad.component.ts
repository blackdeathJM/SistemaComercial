import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.scss']
})
export class ContabilidadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
