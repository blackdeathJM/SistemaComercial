export interface IGenerarColumnTabla
{
    etiqueta: string;
    def: string;
    llaveDato: string;
    formato?: string;
    width: string;
    tipoDeDato?: string;
    html?: string;
}

export interface IDatosTablaFormComun
{
    idIndicador: string;
    dato: string;
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;

    trim1Ant: number;
    trim2Ant: number;
    trim3Ant: number;
    trim4Ant: number;

    idIndicadorAd: string;
    datoAd: string;
    trim1Ad: number;
    trim2Ad: number;
    trim3Ad: number;
    trim4Ad: number;
}

export interface IDatosTablaDinamica
{
    idIndicador: string;
    dato: string;

    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;

    trim1Ant: number;
    trim2Ant: number;
    trim3Ant: number;
    trim4Ant: number;
}
