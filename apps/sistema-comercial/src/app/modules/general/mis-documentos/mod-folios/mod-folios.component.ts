import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
    standalone: true,
    imports:
        [
            CommonModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule
        ],
  selector: 'app-mod-folios',
  templateUrl: './mod-folios.component.html',
  styleUrls: ['./mod-folios.component.scss']
})
export class ModFoliosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
