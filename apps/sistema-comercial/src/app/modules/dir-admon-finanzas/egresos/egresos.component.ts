import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egresos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.scss']
})
export class EgresosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
