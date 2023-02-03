export interface IRoles
{
    _id: string
    idEmpleado: string;
    roles: object[];
}

export type TRolesAsig = Pick<IRoles, 'idEmpleado'>;
export type TCrearRol = Omit<IRoles, '_id'>;

export interface IActRoles extends Pick<IRoles, '_id'>
{
    idRutaPrincipal: string;
    idRutaSecundaria: string;
    idRutaTreciaria: string;
    idRutaCuarta: string;
    acceso: boolean;
}
