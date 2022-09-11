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
    guardarLocal: boolean;
    file: Promise<IArchivo[]>;
}
