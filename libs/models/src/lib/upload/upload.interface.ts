import {Stream} from 'stream';

export interface ISubirArchivo
{
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}
