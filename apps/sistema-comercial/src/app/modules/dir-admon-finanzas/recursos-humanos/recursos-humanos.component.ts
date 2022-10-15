import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recursos-humanos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recursos-humanos.component.html',
  styleUrls: ['./recursos-humanos.component.scss']
})
export class RecursosHumanosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
