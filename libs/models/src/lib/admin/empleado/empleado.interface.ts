import {IAuth} from './auth/auth.interface';
import {IDepto} from '../deptos/depto.interface';

export interface IEmpleado
{
    _id: string;
    avatar: string;
    nombreCompleto: string;
    calle: string;
    colonia: string;
    fechaIngreso: number;
    fechaBaja: number;
    activo: boolean;
    auth: IAuth;
    telefono: string[];
    correo: string;
    modificadoPor: IModificado[];
    //Relacion
    deptoId: string;
}

export interface IResolveEmpleado extends IEmpleado
{
    deptoEmpleado: IDepto;
}

export interface IModificado
{
    usuario: string;
    fecha: number;
    accion: string;
}

export interface IPuesto
{
    puesto: string;
    sueldo: number;
    isr: number;
    fecha: number;
}

export interface ISeguroSocial
{
    nss: string;
}

export type TRegEmpleado = Omit<IEmpleado, '_id' | 'auth'>;
