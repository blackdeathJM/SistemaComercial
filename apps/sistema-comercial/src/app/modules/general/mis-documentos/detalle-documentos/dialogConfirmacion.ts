import {FuseConfirmationConfig} from '@s-fuse/confirmation';

export const confirmarFolio: FuseConfirmationConfig =
    {
        title: 'Generar folio',
        message: 'Confirma que deseas generar un nuevo folio? <span class="font-medium">Esta accion no puede revertirse!</span>',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn'
        },
        actions: {
            confirm: {
                show: true,
                label: 'Generar Folio',
                color: 'warn'
            },
            cancel: {
                show: true,
                label: 'Cancelar'
            }
        },
        dismissible: true
    };

export const confirmarFinalizarDoc: FuseConfirmationConfig =
    {
        title: 'Dar por terminado un documento',
        message: 'Confirma que deseas dar por finalizado este documento? <span class="font-medium">Esta accion no puede revertirse!</span>',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn'
        },
        actions: {
            confirm: {
                show: true,
                label: 'Finzalizar documento',
                color: 'warn'
            },
            cancel: {
                show: true,
                label: 'Cancelar'
            }
        },
        dismissible: true
    };
