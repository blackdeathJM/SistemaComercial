export interface IOtrosDatos
{
    nombreCampo: string;
    valor: number;
}

export interface IComponente1
{
    idIndicador: string;
    descripcion: string;
    valor: number;
    otroCampo: IOtrosDatos[];
    avanceTrim1: number;
    avanceTrim2: number;
    avanceTrim3: number;
    avanceTrim4: number;
    obtenerValorPorMes: boolean;
    formCalTrim1: string;
    formCalTrim2: string
    formCalTrim3: string;
    formCalTrim4: string;
}
