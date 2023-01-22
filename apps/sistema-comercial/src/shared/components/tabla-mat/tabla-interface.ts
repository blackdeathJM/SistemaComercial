export interface ITabla
{
    etiqueta: string;
    def: string;
    llaveDato: string;
    formato?: string;
    tipoDeDato?: 'date' | 'object' | 'number';
}
