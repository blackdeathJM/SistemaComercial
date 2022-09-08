import {FuseConfirmationConfig} from '@s-fuse/confirmation';

export const modalConfirmacionEliminar: FuseConfirmationConfig =
    {
        title: 'Eliminar registro',
        message: 'Confirma que deseas eliminar este registro? <span class="font-medium">Esta accion no puede revertirse!</span>',
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation',
            color: 'warn'
        },
        actions: {
            confirm: {
                show: true,
                label: 'Eliminar registro',
                color: 'warn'
            },
            cancel: {
                show: true,
                label: 'Cancelar'
            }
        },
        dismissible: true
    };
