import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
