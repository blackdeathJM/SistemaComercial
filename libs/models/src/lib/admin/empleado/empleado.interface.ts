import {IAuth} from './auth.interface';

export interface IEmpleado
{
    _id?: string;
    avatar: string;
    nombreCompleto: string;
    calle: string;
    colonia: string;
    fechaIngreso: Date;
    fechaBaja?: Date;
    activo: boolean;
    puesto: IPuesto[];
    modificadoPor: IModificado[];
    telefono: ITelefono[];
    correo: ICorreo[];
    auth?: IAuth;
    deptoId: string;
}

export interface IModificado
{
    usuario: string;
    fecha: Date;
}

export interface ITelefono
{
    telefono: string;
    etiqueta: string;
}

export interface ICorreo
{
    correo: string;
    etiqueta: string;
}

export interface IPuesto
{
    puesto: string;
    sueldo: number;
    isr: number;
    fecha: Date;
    modificado: IModificado[];
}
