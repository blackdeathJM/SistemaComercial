export interface IDocumentos
{
    _id: string;
    identificadorDoc: string;
    folio: string;
    tipoDoc: string;
    esInterno: boolean;
    dependencia: string;
    comentario: string;
    asunto: string;
    docUrl: string;
    acuseUrl: string;
    fechaRecepcion: string;
    fechaLimiteEntrega: string;
    fechaTerminado: string;
    proceso: 'pendiente' | 'terminado';
    usuarioFolio: string;
    enviadoPor: string;
    ano: number;
    ref: string[];
}

