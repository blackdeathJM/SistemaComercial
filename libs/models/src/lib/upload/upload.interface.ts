import {Stream} from 'stream';

export interface ISubirArchivo
{
    filename: string;
    mimetype: string;
    encoding: string;
    // createReadStream: () => Stream;
    createReadStream: any;
}

export interface IFile
{
    id: string;
    filepath: string;
    mimetype: string;
    encoding: string;
    filename: string;
}
