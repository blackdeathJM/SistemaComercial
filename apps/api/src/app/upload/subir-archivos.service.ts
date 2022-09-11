import {Injectable} from '@nestjs/common';
import {UploadDto} from '@sistema-comercial/modelos/upload.dto';
import {randomUUID} from 'crypto';
import {join} from 'path';
import * as fs from 'fs';

@Injectable()
export class SubirArchivosService
{
    async subirArchivos(files: UploadDto): Promise<string[]>
    {
        const ano = new Date().getFullYear();
        const rutas: string[] = [];
        try
        {
            const rutaDeGuardado = join(process.cwd(), `/apps/api/src/public/${files.carpeta}`);
            if (files.guardarLocal)
            {
                for (const file of await files.file)
                {
                    const {createReadStream, filename} = await file;
                    const nvoNombre = ano + '-' + randomUUID() + '.' + filename.split('.').pop();
                    const rutaGuardar = join(rutaDeGuardado + `/${nvoNombre}`);

                    if (!fs.existsSync(rutaDeGuardado))
                    {
                        fs.mkdirSync(rutaDeGuardado);
                    }

                    const stream = createReadStream();
                    const salida = fs.createWriteStream(rutaGuardar);
                    stream.pipe(salida);
                    rutas.push(rutaGuardar);
                }
                return rutas;
            }
        } catch (e)
        {
            console.log('error al cargar archivo', e);
            return [];
        }
    }
}

