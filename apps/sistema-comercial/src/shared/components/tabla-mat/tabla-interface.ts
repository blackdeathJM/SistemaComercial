export interface ITabla
{
    etiqueta: string;
    def: string;
    llaveDato: string;
    format?: string;
    tipoDeDato: 'date' | 'object' | 'number';
}
