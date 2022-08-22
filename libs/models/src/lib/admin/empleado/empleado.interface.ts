import {IAuth} from './auth.interface';
import {IDepto} from '../deptos/depto.interface';

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
    modificadoPor: IModificado[];
    auth?: IAuth;

    //Relacion
    deptoId: string;
    //Resolve
    deptoEmpleado?: IDepto;
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

export interface ISeguroSocial
{
    nss: string;
}
