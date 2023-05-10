export interface IValoresAdicionales
{
    campo: string;
    valor: number;
}

export interface formUno
{
    id: string;
    idIndicador: string;
}

export interface IComponente
{
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
    formulaTrim: string;
    tipoForm: number;
    formUno: formUno[];
    valoresAdicionales: IValoresAdicionales[];
}
