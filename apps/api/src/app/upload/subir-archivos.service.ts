import {Injectable, InternalServerErrorException} from '@nestjs/common';
import path, {join} from 'path';
import fs, {remove} from 'fs-extra';
import {UploadDto} from '#api/libs/models/src/lib/upload/upload.dto';
import {randomUUID} from 'crypto';

@Injectable()
export class SubirArchivosService
{
    async subirArchivos(files: UploadDto): Promise<string[]>
    {
        const ano = new Date().getFullYear();
        const mes = new Date().toLocaleString('es-mx', {month: 'long'});
        const rutas: string[] = [];
        let rutaDeGuardado: string;

        const {carpeta, url, eliminar} = files;
        if (carpeta === 'perfil')
        {
            rutaDeGuardado = join(__dirname, 'public/perfil');
        } else
        {
            rutaDeGuardado = join(__dirname, `public/${files.carpeta}/${ano}/${mes}`);
        }
        try
        {
            if (eliminar)
            {
                await remove(url);
            }

            await fs.ensureDir(path.join(rutaDeGuardado));
            for (const arch of await files.file)
            {
                const {createReadStream, filename} = await arch;
                const nvoNombre = ano + '-' + randomUUID() + '.' + filename.split('.').pop();
                const guardarArchivo = join(rutaDeGuardado, `/${nvoNombre}`);
                const salida = fs.createWriteStream(guardarArchivo);
                createReadStream().pipe(salida);
                rutas.push(guardarArchivo);
            }
            return rutas;
        } catch (e)
        {
            console.log('++++++++', e);
            throw new InternalServerErrorException({message: e});
        }
    }
}

