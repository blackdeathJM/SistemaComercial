import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-perfil',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {}
