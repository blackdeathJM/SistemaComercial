export interface ITabla
{
    etiqueta: string;
    def: string;
    llaveDato: string;
    formato?: string;
    width: string;
    tipoDeDato?: 'date' | 'object' | 'number';
    html?: string;
}
