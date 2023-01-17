import {IAuth} from './auth/auth.interface';
import {IDepto} from '../deptos/depto.interface';
import {IModificado} from '../../common/common.interface';

export interface ITelefono
{
    numero: string;
}

export interface IPuesto
{
    puesto: string;
    sueldo: number;
    isr: number;
    fechaAsignacion: number;
}

export interface ISeguroSocial
{
    nss: string;
}

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
    telefono: ITelefono[];
    correo: string;
    modificadoPor: IModificado[];
    //Relacion
    puesto: IPuesto[];
    deptoId: string;
}

export interface IResolveEmpleado extends IEmpleado
{
    deptoEmpleado: IDepto;
}

export type TRegEmpleado = Omit<IEmpleado, '_id' | 'auth' | 'fechaBaja' | 'puesto'>;
