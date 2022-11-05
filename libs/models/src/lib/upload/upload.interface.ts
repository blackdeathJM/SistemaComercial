import {Stream} from 'stream';

export interface IArchivo
{
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
    // createReadStream: any;
}

export interface IDatosArchivo
{
    carpeta: string;
    reemplazar: boolean;
    eliminar: boolean;
    url: string;
    file: Promise<IArchivo[]>;
}
