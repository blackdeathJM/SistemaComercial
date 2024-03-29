import {IModificado} from '../../../common/common.interface';
import {IAuth} from '../../../admin/empleado/auth/auth.interface';
import {IDepto} from '../deptos/depto.interface';
import {PartialType} from "@nestjs/graphql";

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
    activo: boolean;
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
    planeacionCentroGestor: string;
}

export interface IResolveEmpleado extends IEmpleado
{
    deptoEmpleado: IDepto;
}
