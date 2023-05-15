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

export interface IComponentePlantas
{
    idIndicador: string;
    ptarE: string;

    sstTrim1E: number;
    dqoTrim1E: number;
    grasasAceitesTrim1E: number;
    sumaSstTrim1E: number;
    sumaDqoTrim1E: number;
    sumaGrasasAceites1E: number;

    sstTrim2E: number;
    dqoTrim2E: number;
    grasasAceitesTrim2E: number;
    sumaDqoTrim2E: number;
    sumaSstTrim2E: number;
    sumaGrasasAceites2E: number;

    sstTrim3E: number;
    dqoTrim3E: number;
    grasasAceitesTrim3E: number;
    sumaDqoTrim3E: number;
    sumaSstTrim3E: number;
    sumaGrasasAceites3E: number;

    sstTrim4E: number;
    dqoTrim4E: number;
    grasasAceitesTrim4E: number;
    sumaDqoTrim4E: number;
    sumaSstTrim4E: number;
    sumaGrasasAceites4E: number;

    sstS: number;
    dqoS: number;
    grasasAceitesS: number;
    sumaSstE: number;
    sumaGrasasAceitesE: number;

    sstPorcentajeTrim1: number;
    dqoPorcentajeTrim1: number;
    grasasAceitesPorcentajeTrim1: number;
    sstTotalTrim1: number;
    dqoTotalTrim1: number;
    grasasAceitesTrim1: number;


    sstPorcentajeTrim2: number;
    dqoPorcentajeTrim2: number;
    grasasAceitesPorcentajeTrim2: number;
    sstTotalTrim2: number;
    dqoTotalTrim2: number;
    grasasAceitesTrim2: number;

    sstPorcentajeTrim3: number;
    dqoPorcentajeTrim3: number;
    grasasAceitesPorcentajeTrim3: number;
    sstTotalTrim3: number;
    dqoTotalTrim3: number;
    grasasAceitesTrim3: number;

    sstPorcentajeTrim4: number;
    dqoPorcentajeTrim4: number;
    grasasAceitesPorcentajeTrim4: number;
    sstTotalTrim4: number;
    dqoTotalTrim4: number;
    grasasAceitesTrim4: number;

    trim1: number;
    trim2: number;
    trim3: number;
    trim4: number;
}
