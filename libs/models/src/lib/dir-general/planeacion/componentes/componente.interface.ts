export interface IFormPlanta
{
    tipoForm: number;
    ptarE: string;
    sstE: number;
    dqoE: number;
    grasasAceitesE: number;
}

export interface IformComun
{
    idVariable: string;
    descripcion: string;
    //Estos valores son recogidos de los trimestres establecidos en pbr
    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;

    avanceTrim1: number;
}
//La forma que se va a calcular el Avance trimestral es dividiento el idIndicador entre el otro idIndicador
export interface IForm1
{
    // Es el idIndicador del cuestonario PBR
    idIndicador: string;
    descripcion: string;

    valorTrim1: IDefCampoValor;
    valorTrim2: IDefCampoValor;
    valorTrim3: IDefCampoValor;
    valorTrim4: IDefCampoValor;

    etiquetaValor: string;

    avanceTrim1: number;
    avanceTrim2: number;
    avanceTrim3: number;
    avanceTrim4: number;
    etiquetaTrim: string;
}

export interface IForm2 extends IForm1
{
    campoAntTrim1: IDefCampoValor;
    campoAntTrim2: IDefCampoValor;
    campoAntTrim3: IDefCampoValor;
    campoAntTrim4: IDefCampoValor;

}

export interface IDefCampoValor
{
    defCampo: string;
    valorCampo: number;
}

export interface ICamposAdicionales
{
    titulo: string;
    campo: IDefCampoValor[];
}

// ? Esta funciona

// export interface IComponente
// {
//     //Establecemos que tipo de formulario se va a usar en el componente
//     tipoForm: number;
// }

export interface IComponente
{
    id: string;
    cabecera: string[];
    valor: string[];
    trimValor: number;
    trimestre: string;
    etiqueta: string;
}
