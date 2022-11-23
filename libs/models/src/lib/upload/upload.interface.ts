import {Stream} from 'stream';

export interface IArchivo
{
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}

export interface IDatosArchivo
{
    carpeta: string;
    eliminar: boolean;
    url: string;
    file: Promise<IArchivo[]>;
}
