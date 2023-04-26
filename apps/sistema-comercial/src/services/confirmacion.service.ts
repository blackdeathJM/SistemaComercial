import { Injectable } from '@angular/core';
import { FuseConfirmationConfig } from '@s-fuse/confirmation';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationDialogComponent } from '@s-fuse/confirmation/dialog/dialog.component';
import { merge } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class ConfirmacionService
{
    private configPorDefecto: FuseConfirmationConfig =
        {
            title: 'Confirma accion',
            message: 'Estas seguro(a) de realizar esta accion?',
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn'
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Confirmar',
                    color: 'warn'
                },
                cancel: {
                    show: true,
                    label: 'Cancelar'
                }
            },
            dismissible: false
        };

    constructor(private mdr: MatDialog)
    {
    }

    abrir(config: FuseConfirmationConfig = {}): MatDialogRef<FuseConfirmationDialogComponent>
    {
        const configUsuario = merge({}, this.configPorDefecto, config);
        return this.mdr.open(FuseConfirmationDialogComponent, {
            autoFocus: false, disableClose: !configUsuario.dismissible, data: configUsuario,
            panelClass: 'fuse-confirmation-dialog-panel'
        });
    }
}
