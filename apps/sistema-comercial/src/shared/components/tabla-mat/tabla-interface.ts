export interface ITabla
{
    etiqueta: string;
    def: string;
    //Este es utilizado por el pipe aunque las definiciones que se estan utilizando son las mismas que en def la verdad es que se utiliza para cuando en la coleccion tiene subdocumentos
    // para aplicarles formato tanto documentos como subdocumentos
    llaveDato: string;
    formato?: string;
    width: string;
    tipoDeDato?: 'date' | 'object' | 'number';
    total: string;
    html?: string;
}
