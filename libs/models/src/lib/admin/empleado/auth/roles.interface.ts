export interface IRoles
{
    _id: string
    idEmpleado: string;
    roles: object[];
}

export type TRolesAsig = Pick<IRoles, 'idEmpleado'>;
export type TCrearRol = Omit<IRoles, '_id'>;
